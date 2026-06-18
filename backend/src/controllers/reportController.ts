import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';
import { getDateRange } from '../utils/pagination';

export const getPLReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const { from, to } = getDateRange(req);
    const restaurantId = req.query.restaurantId as string | undefined;
    const baseWhere = { companyId, ...(restaurantId ? { restaurantId } : {}) };

    const [revenue, purchases, expenses, payroll] = await Promise.all([
      prisma.revenueEntry.groupBy({
        by: ['source'],
        where: { ...baseWhere, ...(from || to ? { date: { gte: from, lte: to } } : {}) },
        _sum: { amount: true },
      }),
      prisma.purchaseInvoice.aggregate({
        where: { ...baseWhere, status: 'POSTED', ...(from || to ? { invoiceDate: { gte: from, lte: to } } : {}) },
        _sum: { subtotal: true, vatAmount: true, total: true },
      }),
      prisma.expense.groupBy({
        by: ['categoryId'],
        where: { ...baseWhere, ...(from || to ? { date: { gte: from, lte: to } } : {}) },
        _sum: { amount: true },
      }),
      prisma.payrollRun.aggregate({
        where: { companyId, ...(restaurantId ? { restaurantId } : {}), status: { in: ['APPROVED', 'PAID'] } },
        _sum: { totalNet: true },
      }),
    ]);

    const totalRevenue = revenue.reduce((s, r) => s + Number(r._sum.amount || 0), 0);
    const cogs = Number(purchases._sum.subtotal || 0);
    const grossProfit = totalRevenue - cogs;
    const totalExpenses = expenses.reduce((s, e) => s + Number(e._sum.amount || 0), 0);
    const laborCost = Number(payroll._sum.totalNet || 0);
    const operatingExpenses = totalExpenses + laborCost;
    const netProfit = grossProfit - operatingExpenses;

    const expenseCategories = await Promise.all(
      expenses.map(async (e) => {
        const cat = await prisma.expenseCategory.findUnique({ where: { id: e.categoryId }, select: { nameAr: true, nameEn: true } });
        return { ...cat, amount: Number(e._sum.amount || 0) };
      })
    );

    sendSuccess(res, {
      period: { from, to },
      revenue: {
        total: totalRevenue,
        bySource: revenue.map(r => ({ source: r.source, amount: Number(r._sum.amount || 0) })),
      },
      cogs: { total: cogs, vat: Number(purchases._sum.vatAmount || 0) },
      grossProfit: { amount: grossProfit, margin: totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0 },
      operatingExpenses: {
        total: operatingExpenses,
        laborCost,
        otherExpenses: { total: totalExpenses, byCategory: expenseCategories },
      },
      netProfit: { amount: netProfit, margin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0 },
    });
  } catch (err) { console.error(err); sendError(res, 'Failed to generate P&L report', 500); }
};

export const getRevenueReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const { from, to } = getDateRange(req);
    const restaurantId = req.query.restaurantId as string | undefined;

    const entries = await prisma.revenueEntry.findMany({
      where: { companyId, ...(restaurantId ? { restaurantId } : {}), ...(from || to ? { date: { gte: from, lte: to } } : {}) },
      include: { restaurant: { select: { nameAr: true } }, branch: { select: { nameAr: true } } },
      orderBy: { date: 'desc' },
    });

    const bySource = await prisma.revenueEntry.groupBy({
      by: ['source'],
      where: { companyId, ...(restaurantId ? { restaurantId } : {}), ...(from || to ? { date: { gte: from, lte: to } } : {}) },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    });

    const total = entries.reduce((s, e) => s + Number(e.amount), 0);
    sendSuccess(res, { entries, bySource, total });
  } catch { sendError(res, 'Failed to generate revenue report', 500); }
};

export const getInventoryReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const branchId = req.query.branchId as string | undefined;

    const locations = await prisma.inventoryLocation.findMany({
      where: { branch: { companyId }, ...(branchId ? { branchId } : {}) },
      include: {
        item: { include: { category: { select: { nameAr: true, type: true } } } },
        branch: { select: { nameAr: true } },
      },
    });

    const totalValue = locations.reduce((s, l) => s + Number(l.quantity) * Number(l.averageCost), 0);
    const lowStock = locations.filter(l => Number(l.quantity) <= Number(l.item.minStock) && Number(l.item.minStock) > 0);

    sendSuccess(res, { locations, totalValue, lowStockCount: lowStock.length, lowStock });
  } catch { sendError(res, 'Failed to generate inventory report', 500); }
};

export const getFoodCostReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const { from, to } = getDateRange(req);
    const restaurantId = req.query.restaurantId as string | undefined;

    const [purchases, revenue] = await Promise.all([
      prisma.purchaseInvoice.findMany({
        where: {
          companyId, ...(restaurantId ? { restaurantId } : {}), status: 'POSTED',
          ...(from || to ? { invoiceDate: { gte: from, lte: to } } : {}),
        },
        include: { supplier: { select: { nameAr: true } }, lines: { include: { item: { select: { nameAr: true } } } } },
      }),
      prisma.revenueEntry.aggregate({
        where: { companyId, ...(restaurantId ? { restaurantId } : {}), ...(from || to ? { date: { gte: from, lte: to } } : {}) },
        _sum: { amount: true },
      }),
    ]);

    const totalCOGS = purchases.reduce((s, p) => s + Number(p.subtotal), 0);
    const totalRevenue = Number(revenue._sum.amount || 0);
    const foodCostPct = totalRevenue > 0 ? (totalCOGS / totalRevenue) * 100 : 0;

    sendSuccess(res, {
      totalCOGS, totalRevenue, foodCostPercent: Math.round(foodCostPct * 100) / 100,
      purchases: purchases.map(p => ({
        invoiceNumber: p.invoiceNumber, invoiceDate: p.invoiceDate,
        supplier: p.supplier.nameAr, subtotal: Number(p.subtotal), total: Number(p.total),
      })),
    });
  } catch { sendError(res, 'Failed to generate food cost report', 500); }
};

export const getPayrollReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const restaurantId = req.query.restaurantId as string | undefined;
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();

    const where: Record<string, unknown> = { companyId, ...(restaurantId ? { restaurantId } : {}), ...(year ? { year } : {}), ...(month ? { month } : {}) };

    const runs = await prisma.payrollRun.findMany({
      where,
      include: {
        lines: { include: { employee: { select: { nameAr: true, nameEn: true, position: true } } } },
        restaurant: { select: { nameAr: true } },
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    const totals = runs.reduce((s, r) => ({
      totalBasic: s.totalBasic + Number(r.totalBasic),
      totalAllowances: s.totalAllowances + Number(r.totalAllowances),
      totalDeductions: s.totalDeductions + Number(r.totalDeductions),
      totalNet: s.totalNet + Number(r.totalNet),
    }), { totalBasic: 0, totalAllowances: 0, totalDeductions: 0, totalNet: 0 });

    sendSuccess(res, { runs, totals });
  } catch { sendError(res, 'Failed to generate payroll report', 500); }
};

export const getVatReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const year = parseInt(req.query.year as string) || new Date().getFullYear();
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const restaurantId = req.query.restaurantId as string | undefined;

    const months = month ? [month] : Array.from({ length: 12 }, (_, i) => i + 1);

    const monthlyData = await Promise.all(months.map(async (m) => {
      const from = new Date(year, m - 1, 1);
      const to = new Date(year, m, 0, 23, 59, 59, 999);
      const baseWhere = { companyId, ...(restaurantId ? { restaurantId } : {}) };

      const [revenueAgg, expenseAgg, purchaseAgg] = await Promise.all([
        prisma.revenueEntry.aggregate({
          where: { ...baseWhere, date: { gte: from, lte: to } },
          _sum: { amount: true, vatAmount: true, amountExVat: true },
        }),
        prisma.expense.aggregate({
          where: { ...baseWhere, isVatable: true, date: { gte: from, lte: to } },
          _sum: { amount: true, vatAmount: true },
        }),
        prisma.purchaseInvoice.aggregate({
          where: { ...baseWhere, invoiceType: 'TAX', status: 'POSTED', invoiceDate: { gte: from, lte: to } },
          _sum: { vatAmount: true, subtotal: true, total: true },
        }),
      ]);

      const vatCollected = Number(revenueAgg._sum.vatAmount || 0);
      const vatPaidExpenses = Number(expenseAgg._sum.vatAmount || 0);
      const vatPaidPurchases = Number(purchaseAgg._sum.vatAmount || 0);
      const vatPaid = vatPaidExpenses + vatPaidPurchases;
      const netVatPayable = vatCollected - vatPaid;

      return {
        month: m, year,
        revenue: { total: Number(revenueAgg._sum.amount || 0), exVat: Number(revenueAgg._sum.amountExVat || 0), vatCollected },
        expenses: { total: Number(expenseAgg._sum.amount || 0), vatPaid: vatPaidExpenses },
        purchases: { total: Number(purchaseAgg._sum.total || 0), vatPaid: vatPaidPurchases },
        vatCollected, vatPaid, netVatPayable,
      };
    }));

    const totals = monthlyData.reduce((acc, m) => ({
      vatCollected: acc.vatCollected + m.vatCollected,
      vatPaid: acc.vatPaid + m.vatPaid,
      netVatPayable: acc.netVatPayable + m.netVatPayable,
      totalRevenue: acc.totalRevenue + m.revenue.total,
      totalRevExVat: acc.totalRevExVat + m.revenue.exVat,
    }), { vatCollected: 0, vatPaid: 0, netVatPayable: 0, totalRevenue: 0, totalRevExVat: 0 });

    sendSuccess(res, { year, monthly: monthlyData, totals });
  } catch (err) { console.error(err); sendError(res, 'Failed to generate VAT report', 500); }
};

export const getVatDeclaration = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const year = parseInt(req.query.year as string) || new Date().getFullYear();
    const quarter = req.query.quarter ? parseInt(req.query.quarter as string) : undefined;
    const restaurantId = req.query.restaurantId as string | undefined;

    // Determine months for the period
    let months: number[];
    if (quarter) {
      months = [(quarter - 1) * 3 + 1, (quarter - 1) * 3 + 2, (quarter - 1) * 3 + 3];
    } else {
      months = Array.from({ length: 12 }, (_, i) => i + 1);
    }

    const from = new Date(year, months[0] - 1, 1);
    const to = new Date(year, months[months.length - 1], 0, 23, 59, 59, 999);
    const baseWhere = { companyId, ...(restaurantId ? { restaurantId } : {}) };

    const [company, revenueAgg, purchaseAgg, expenseAgg] = await Promise.all([
      prisma.company.findUnique({ where: { id: companyId }, select: { name: true, nameAr: true, vatNumber: true } }),
      prisma.revenueEntry.aggregate({
        where: { ...baseWhere, date: { gte: from, lte: to } },
        _sum: { amount: true, vatAmount: true, amountExVat: true },
      }),
      prisma.purchaseInvoice.aggregate({
        where: { ...baseWhere, invoiceType: 'TAX', status: 'POSTED', invoiceDate: { gte: from, lte: to } },
        _sum: { subtotal: true, vatAmount: true, total: true },
      }),
      prisma.expense.aggregate({
        where: { ...baseWhere, isVatable: true, date: { gte: from, lte: to } },
        _sum: { amount: true, vatAmount: true },
      }),
    ]);

    const vatOnSales = Number(revenueAgg._sum.vatAmount || 0);
    const vatOnPurchases = Number(purchaseAgg._sum.vatAmount || 0);
    const vatOnExpenses = Number(expenseAgg._sum.vatAmount || 0);
    const totalInputVat = vatOnPurchases + vatOnExpenses;
    const netVatPayable = vatOnSales - totalInputVat;

    sendSuccess(res, {
      declaration: {
        taxPayer: { name: company?.name, nameAr: company?.nameAr, vatNumber: company?.vatNumber },
        period: { year, quarter: quarter || 'Annual', from, to },
        outputVat: {
          standardRatedSales: Number(revenueAgg._sum.amountExVat || 0),
          vatOnSales,
        },
        inputVat: {
          standardRatedPurchases: Number(purchaseAgg._sum.subtotal || 0),
          vatOnPurchases,
          vatableExpenses: Number(expenseAgg._sum.amount || 0),
          vatOnExpenses,
          totalInputVat,
        },
        netVatPayable,
        status: netVatPayable > 0 ? 'PAYABLE' : 'REFUNDABLE',
      },
    });
  } catch (err) { console.error(err); sendError(res, 'Failed to generate VAT declaration', 500); }
};

export const getRevenueByRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const { from, to } = getDateRange(req);
    const dateFilter = from || to ? { date: { gte: from, lte: to } } : {};

    const byRestaurant = await prisma.revenueEntry.groupBy({
      by: ['restaurantId'],
      where: { companyId, ...dateFilter },
      _sum: { amount: true, vatAmount: true },
      orderBy: { _sum: { amount: 'desc' } },
    });

    const restaurants = await prisma.restaurant.findMany({ where: { companyId }, select: { id: true, nameAr: true, nameEn: true } });
    const restMap = new Map(restaurants.map(r => [r.id, r]));

    const total = byRestaurant.reduce((s, r) => s + Number(r._sum.amount || 0), 0);
    sendSuccess(res, {
      total,
      byRestaurant: byRestaurant.map(r => ({
        restaurantId: r.restaurantId,
        restaurant: restMap.get(r.restaurantId),
        amount: Number(r._sum.amount || 0),
        vatAmount: Number(r._sum.vatAmount || 0),
        percentage: total > 0 ? ((Number(r._sum.amount || 0) / total) * 100).toFixed(1) : '0',
      })),
    });
  } catch { sendError(res, 'Failed to generate report', 500); }
};

export const getRevenueByBranch = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const { from, to } = getDateRange(req);
    const dateFilter = from || to ? { date: { gte: from, lte: to } } : {};

    const byBranch = await prisma.revenueEntry.groupBy({
      by: ['branchId', 'restaurantId'],
      where: { companyId, branchId: { not: null }, ...dateFilter },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    });

    const branches = await prisma.branch.findMany({ where: { companyId }, include: { restaurant: { select: { nameAr: true } } } });
    const branchMap = new Map(branches.map(b => [b.id, b]));

    const total = byBranch.reduce((s, b) => s + Number(b._sum.amount || 0), 0);
    sendSuccess(res, {
      total,
      byBranch: byBranch.map(b => ({
        branchId: b.branchId,
        branch: b.branchId ? branchMap.get(b.branchId) : null,
        amount: Number(b._sum.amount || 0),
        percentage: total > 0 ? ((Number(b._sum.amount || 0) / total) * 100).toFixed(1) : '0',
      })),
    });
  } catch { sendError(res, 'Failed to generate report', 500); }
};

export const getRevenueByMonth = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const year = parseInt(req.query.year as string) || new Date().getFullYear();
    const restaurantId = req.query.restaurantId as string | undefined;
    const baseWhere = { companyId, ...(restaurantId ? { restaurantId } : {}) };

    const monthly = await Promise.all(
      Array.from({ length: 12 }, (_, i) => i + 1).map(async (m) => {
        const from = new Date(year, m - 1, 1);
        const to = new Date(year, m, 0, 23, 59, 59, 999);
        const agg = await prisma.revenueEntry.aggregate({
          where: { ...baseWhere, date: { gte: from, lte: to } },
          _sum: { amount: true, vatAmount: true },
        });
        return { month: m, year, amount: Number(agg._sum.amount || 0), vatAmount: Number(agg._sum.vatAmount || 0) };
      })
    );

    const total = monthly.reduce((s, m) => s + m.amount, 0);
    sendSuccess(res, { year, monthly, total });
  } catch { sendError(res, 'Failed to generate report', 500); }
};

export const getAuditLog = async (req: AuthRequest, res: Response) => {
  try {
    const { from, to } = getDateRange(req);
    const logs = await prisma.auditLog.findMany({
      where: {
        companyId: req.user!.companyId,
        ...(from || to ? { createdAt: { gte: from, lte: to } } : {}),
      },
      include: { user: { select: { nameAr: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    sendSuccess(res, logs);
  } catch { sendError(res, 'Failed to fetch audit log', 500); }
};

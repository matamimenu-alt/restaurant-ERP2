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

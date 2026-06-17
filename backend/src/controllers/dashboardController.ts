import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

export const getFlashReport = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const restaurantId = req.query.restaurantId as string | undefined;
    const targetDate = req.query.date ? new Date(req.query.date as string) : new Date();

    const startOfDay = new Date(targetDate); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate); endOfDay.setHours(23, 59, 59, 999);

    const yesterday = new Date(startOfDay); yesterday.setDate(yesterday.getDate() - 1);
    const endOfYesterday = new Date(endOfDay); endOfYesterday.setDate(endOfYesterday.getDate() - 1);

    const sameLastWeek = new Date(startOfDay); sameLastWeek.setDate(sameLastWeek.getDate() - 7);
    const endSameLastWeek = new Date(endOfDay); endSameLastWeek.setDate(endSameLastWeek.getDate() - 7);

    const sameLastMonth = new Date(startOfDay); sameLastMonth.setMonth(sameLastMonth.getMonth() - 1);
    const endSameLastMonth = new Date(endOfDay); endSameLastMonth.setMonth(endSameLastMonth.getMonth() - 1);

    const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);

    const baseWhere = { companyId, ...(restaurantId ? { restaurantId } : {}) };

    const [
      todaySales, yesterdaySales, lastWeekSales, lastMonthSales, mtdSales,
      todayExpenses, mtdExpenses,
      salesBySource,
      payrollMTD,
      inventoryValue,
      lowStockCount,
    ] = await Promise.all([
      prisma.revenueEntry.aggregate({ where: { ...baseWhere, date: { gte: startOfDay, lte: endOfDay } }, _sum: { amount: true } }),
      prisma.revenueEntry.aggregate({ where: { ...baseWhere, date: { gte: yesterday, lte: endOfYesterday } }, _sum: { amount: true } }),
      prisma.revenueEntry.aggregate({ where: { ...baseWhere, date: { gte: sameLastWeek, lte: endSameLastWeek } }, _sum: { amount: true } }),
      prisma.revenueEntry.aggregate({ where: { ...baseWhere, date: { gte: sameLastMonth, lte: endSameLastMonth } }, _sum: { amount: true } }),
      prisma.revenueEntry.aggregate({ where: { ...baseWhere, date: { gte: startOfMonth, lte: endOfDay } }, _sum: { amount: true } }),
      prisma.expense.aggregate({ where: { ...baseWhere, date: { gte: startOfDay, lte: endOfDay } }, _sum: { amount: true } }),
      prisma.expense.aggregate({ where: { ...baseWhere, date: { gte: startOfMonth, lte: endOfDay } }, _sum: { amount: true } }),
      prisma.revenueEntry.groupBy({ by: ['source'], where: { ...baseWhere, date: { gte: startOfDay, lte: endOfDay } }, _sum: { amount: true } }),
      prisma.payrollRun.aggregate({
        where: { companyId, ...(restaurantId ? { restaurantId } : {}), month: targetDate.getMonth() + 1, year: targetDate.getFullYear() },
        _sum: { totalNet: true },
      }),
      prisma.inventoryLocation.aggregate({
        where: { branch: { companyId } },
        _sum: { quantity: true },
      }),
      prisma.inventoryLocation.count({
        where: { branch: { companyId }, quantity: { lte: prisma.inventoryLocation.fields.quantity as never } },
      }),
    ]);

    // Get low stock count properly
    const allLocations = await prisma.inventoryLocation.findMany({
      where: { branch: { companyId } },
      include: { item: { select: { minStock: true } } },
    });
    const actualLowStock = allLocations.filter(l => Number(l.quantity) <= Number(l.item.minStock) && Number(l.item.minStock) > 0).length;

    const todaySalesAmount = Number(todaySales._sum.amount || 0);
    const mtdSalesAmount = Number(mtdSales._sum.amount || 0);
    const mtdExpensesAmount = Number(mtdExpenses._sum.amount || 0);
    const laborCost = Number(payrollMTD._sum.totalNet || 0);

    // Food cost from purchases MTD
    const purchasesMTD = await prisma.purchaseInvoice.aggregate({
      where: { companyId, ...(restaurantId ? { restaurantId } : {}), invoiceDate: { gte: startOfMonth, lte: endOfDay }, status: 'POSTED' },
      _sum: { subtotal: true },
    });
    const foodCostMTD = Number(purchasesMTD._sum.subtotal || 0);

    const grossProfit = mtdSalesAmount - foodCostMTD;
    const netProfit = grossProfit - laborCost - (mtdExpensesAmount - foodCostMTD);
    const profitMargin = mtdSalesAmount > 0 ? (netProfit / mtdSalesAmount) * 100 : 0;
    const foodCostPct = mtdSalesAmount > 0 ? (foodCostMTD / mtdSalesAmount) * 100 : 0;
    const laborCostPct = mtdSalesAmount > 0 ? (laborCost / mtdSalesAmount) * 100 : 0;
    const primeCost = foodCostMTD + laborCost;
    const primeCostPct = mtdSalesAmount > 0 ? (primeCost / mtdSalesAmount) * 100 : 0;

    sendSuccess(res, {
      date: targetDate,
      sales: {
        today: todaySalesAmount,
        yesterday: Number(yesterdaySales._sum.amount || 0),
        sameLastWeek: Number(lastWeekSales._sum.amount || 0),
        sameLastMonth: Number(lastMonthSales._sum.amount || 0),
        mtd: mtdSalesAmount,
      },
      salesBySource: salesBySource.map(s => ({ source: s.source, amount: Number(s._sum.amount || 0) })),
      expenses: {
        today: Number(todayExpenses._sum.amount || 0),
        mtd: mtdExpensesAmount,
      },
      foodCost: { amount: foodCostMTD, percent: Math.round(foodCostPct * 100) / 100 },
      laborCost: { amount: laborCost, percent: Math.round(laborCostPct * 100) / 100 },
      primeCost: { amount: primeCost, percent: Math.round(primeCostPct * 100) / 100 },
      inventory: { lowStockCount: actualLowStock },
      profitability: {
        grossProfit: Math.round(grossProfit * 100) / 100,
        netProfit: Math.round(netProfit * 100) / 100,
        profitMargin: Math.round(profitMargin * 100) / 100,
      },
    });
  } catch (err) { console.error(err); sendError(res, 'Failed to fetch flash report', 500); }
};

export const getExecutiveAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const { from, to } = req.query;
    const startDate = from ? new Date(from as string) : new Date(new Date().getFullYear(), 0, 1);
    const endDate = to ? new Date(to as string) : new Date();

    const restaurants = await prisma.restaurant.findMany({ where: { companyId, isActive: true } });

    const analyticsData = await Promise.all(
      restaurants.map(async (r) => {
        const [revenue, purchases, expenses, payroll] = await Promise.all([
          prisma.revenueEntry.aggregate({ where: { companyId, restaurantId: r.id, date: { gte: startDate, lte: endDate } }, _sum: { amount: true } }),
          prisma.purchaseInvoice.aggregate({ where: { companyId, restaurantId: r.id, invoiceDate: { gte: startDate, lte: endDate }, status: 'POSTED' }, _sum: { total: true } }),
          prisma.expense.aggregate({ where: { companyId, restaurantId: r.id, date: { gte: startDate, lte: endDate } }, _sum: { amount: true } }),
          prisma.payrollRun.aggregate({ where: { companyId, restaurantId: r.id }, _sum: { totalNet: true } }),
        ]);

        const rev = Number(revenue._sum.amount || 0);
        const cogs = Number(purchases._sum.total || 0);
        const exp = Number(expenses._sum.amount || 0);
        const labor = Number(payroll._sum.totalNet || 0);
        const grossProfit = rev - cogs;
        const netProfit = grossProfit - exp - labor;
        const foodCostPct = rev > 0 ? (cogs / rev) * 100 : 0;

        return {
          restaurant: { id: r.id, nameAr: r.nameAr, nameEn: r.nameEn },
          revenue: rev, cogs, expenses: exp, laborCost: labor,
          grossProfit, netProfit, profitMargin: rev > 0 ? (netProfit / rev) * 100 : 0,
          foodCostPercent: Math.round(foodCostPct * 100) / 100,
        };
      })
    );

    const sorted = [...analyticsData].sort((a, b) => b.netProfit - a.netProfit);

    sendSuccess(res, {
      restaurants: analyticsData,
      highestProfitRestaurant: sorted[0] || null,
      lowestProfitRestaurant: sorted[sorted.length - 1] || null,
      highestFoodCostRestaurant: analyticsData.sort((a, b) => b.foodCostPercent - a.foodCostPercent)[0] || null,
      lowestFoodCostRestaurant: analyticsData.sort((a, b) => a.foodCostPercent - b.foodCostPercent)[0] || null,
    });
  } catch (err) { console.error(err); sendError(res, 'Failed to fetch analytics', 500); }
};

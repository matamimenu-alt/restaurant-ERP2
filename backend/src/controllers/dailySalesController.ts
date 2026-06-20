import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';
import { Prisma } from '@prisma/client';

export const getDailySalesRecords = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const where: Prisma.DailySalesRecordWhereInput = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    if (req.query.branchId) where.branchId = req.query.branchId as string;

    const from = req.query.from ? new Date(req.query.from as string) : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;
    if (from || to) where.date = { gte: from, lte: to ? new Date(new Date(to).setHours(23, 59, 59)) : undefined };

    const [data, total] = await Promise.all([
      prisma.dailySalesRecord.findMany({
        where, skip, take: limit, orderBy: { date: 'desc' },
        include: {
          restaurant: { select: { nameAr: true, nameEn: true } },
          branch: { select: { nameAr: true, nameEn: true } },
        },
      }),
      prisma.dailySalesRecord.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch (err) { console.error(err); sendError(res, 'Failed to fetch daily sales records', 500); }
};

export const getDailySalesSummary = async (req: AuthRequest, res: Response) => {
  try {
    const where: Prisma.DailySalesRecordWhereInput = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    const from = req.query.from ? new Date(req.query.from as string) : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;
    if (from || to) where.date = { gte: from, lte: to };

    const agg = await prisma.dailySalesRecord.aggregate({
      where,
      _sum: {
        cashSales: true, cardSales: true,
        hungerStation: true, jahez: true, noonFood: true, talabat: true, app5: true, app6: true,
        openingBalance: true, cashExpenses: true, closingBalance: true,
      },
    });

    const s = agg._sum;
    const cashTotal = Number(s.cashSales || 0);
    const cardTotal = Number(s.cardSales || 0);
    const deliveryTotal = Number(s.hungerStation || 0) + Number(s.jahez || 0) + Number(s.noonFood || 0) + Number(s.talabat || 0) + Number(s.app5 || 0) + Number(s.app6 || 0);
    const totalRevenue = cashTotal + cardTotal + deliveryTotal;

    sendSuccess(res, { cashTotal, cardTotal, deliveryTotal, totalRevenue, ...s });
  } catch (err) { console.error(err); sendError(res, 'Failed', 500); }
};

export const createDailySalesRecord = async (req: AuthRequest, res: Response) => {
  try {
    const { date, vatMode = 'INCLUSIVE', vatRate = 15, cashSales = 0, cardSales = 0,
      hungerStation = 0, jahez = 0, noonFood = 0, talabat = 0, app5 = 0, app6 = 0,
      openingBalance = 0, cashExpenses = 0, restaurantId, branchId, notes } = req.body;

    const totalRevenue = Number(cashSales) + Number(cardSales) + Number(hungerStation) + Number(jahez) + Number(noonFood) + Number(talabat) + Number(app5) + Number(app6);
    let vatAmount = 0;
    if (vatMode === 'EXCLUSIVE') {
      vatAmount = (totalRevenue * Number(vatRate)) / 100;
    } else {
      vatAmount = (totalRevenue * Number(vatRate)) / (100 + Number(vatRate));
    }
    const closingBalance = Number(openingBalance) + Number(cashSales) - Number(cashExpenses);

    const record = await prisma.dailySalesRecord.create({
      data: {
        companyId: req.user!.companyId, restaurantId, branchId: branchId || undefined,
        date: new Date(date), vatMode, vatRate, cashSales, cardSales,
        hungerStation, jahez, noonFood, talabat, app5, app6,
        openingBalance, cashExpenses, closingBalance, notes,
        createdBy: req.user!.userId,
      },
      include: { restaurant: { select: { nameAr: true, nameEn: true } } },
    });
    sendSuccess(res, record, 'Created', 201);
  } catch (err) { console.error(err); sendError(res, 'Failed to create record', 500); }
};

export const updateDailySalesRecord = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.dailySalesRecord.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
    });
    if (!existing) return sendError(res, 'Not found', 404);

    const { date, vatMode, vatRate = 15, cashSales = 0, cardSales = 0,
      hungerStation = 0, jahez = 0, noonFood = 0, talabat = 0, app5 = 0, app6 = 0,
      openingBalance = 0, cashExpenses = 0, restaurantId, branchId, notes } = req.body;

    const closingBalance = Number(openingBalance) + Number(cashSales) - Number(cashExpenses);

    const record = await prisma.dailySalesRecord.update({
      where: { id: req.params.id },
      data: {
        date: date ? new Date(date) : undefined,
        vatMode, vatRate, cashSales, cardSales,
        hungerStation, jahez, noonFood, talabat, app5, app6,
        openingBalance, cashExpenses, closingBalance, notes,
        restaurantId, branchId: branchId || null,
      },
    });
    sendSuccess(res, record);
  } catch (err) { console.error(err); sendError(res, 'Failed to update', 500); }
};

export const deleteDailySalesRecord = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.dailySalesRecord.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
    });
    if (!existing) return sendError(res, 'Not found', 404);
    await prisma.dailySalesRecord.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Deleted');
  } catch (err) { console.error(err); sendError(res, 'Failed to delete', 500); }
};

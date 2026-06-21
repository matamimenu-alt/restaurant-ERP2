import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination, getDateRange } from '../utils/pagination';
import { Prisma } from '@prisma/client';

const buildWhere = (req: AuthRequest): Prisma.RevenueEntryWhereInput => {
  const { from, to } = getDateRange(req);
  const where: Prisma.RevenueEntryWhereInput = { companyId: req.user!.companyId };
  if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
  if (req.query.branchId) where.branchId = req.query.branchId as string;
  if (req.query.source) where.source = req.query.source as never;
  if (from || to) where.date = { gte: from, lte: to };
  return where;
};

export const getRevenue = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const where = buildWhere(req);
    const [data, total, totals] = await Promise.all([
      prisma.revenueEntry.findMany({
        where, skip, take: limit, orderBy: { date: 'desc' },
        include: {
          restaurant: { select: { nameAr: true, nameEn: true } },
          branch: { select: { nameAr: true, nameEn: true } },
        },
      }),
      prisma.revenueEntry.count({ where }),
      prisma.revenueEntry.aggregate({ where, _sum: { amount: true } }),
    ]);
    sendPaginated(res, { entries: data, totalAmount: totals._sum.amount || 0 } as never, total, page, limit);
  } catch { sendError(res, 'Failed to fetch revenue', 500); }
};

export const createRevenue = async (req: AuthRequest, res: Response) => {
  try {
    const entry = await prisma.revenueEntry.create({
      data: { ...req.body, companyId: req.user!.companyId, createdBy: req.user!.userId, date: new Date(req.body.date) },
    });
    sendSuccess(res, entry, 'Revenue entry created', 201);
  } catch { sendError(res, 'Failed to create revenue entry', 500); }
};

export const updateRevenue = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.revenueEntry.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Revenue entry not found', 404);
    const entry = await prisma.revenueEntry.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, entry);
  } catch { sendError(res, 'Failed to update revenue entry', 500); }
};

export const deleteRevenue = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.revenueEntry.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Revenue entry not found', 404);
    await prisma.revenueEntry.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Revenue entry deleted');
  } catch { sendError(res, 'Failed to delete revenue entry', 500); }
};

export const getRevenueSummary = async (req: AuthRequest, res: Response) => {
  try {
    const { from, to } = getDateRange(req);
    const where: Prisma.RevenueEntryWhereInput = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    if (from || to) where.date = { gte: from, lte: to };

    const bySource = await prisma.revenueEntry.groupBy({
      by: ['source'],
      where,
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    });

    const byRestaurant = await prisma.revenueEntry.groupBy({
      by: ['restaurantId'],
      where,
      _sum: { amount: true },
    });

    const total = bySource.reduce((sum, r) => sum + Number(r._sum.amount || 0), 0);

    sendSuccess(res, { total, bySource, byRestaurant });
  } catch { sendError(res, 'Failed to fetch revenue summary', 500); }
};

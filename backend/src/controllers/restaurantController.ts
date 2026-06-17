import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getRestaurants = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const companyId = req.user!.companyId;
    const [data, total] = await Promise.all([
      prisma.restaurant.findMany({
        where: { companyId, isActive: true },
        include: { branches: { where: { isActive: true }, select: { id: true, nameAr: true, nameEn: true } } },
        skip, take: limit, orderBy: { nameAr: 'asc' },
      }),
      prisma.restaurant.count({ where: { companyId, isActive: true } }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch restaurants', 500); }
};

export const getRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: { branches: { where: { isActive: true } } },
    });
    if (!restaurant) return sendError(res, 'Restaurant not found', 404);
    sendSuccess(res, restaurant);
  } catch { sendError(res, 'Failed to fetch restaurant', 500); }
};

export const createRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const restaurant = await prisma.restaurant.create({
      data: { ...req.body, companyId: req.user!.companyId },
    });
    sendSuccess(res, restaurant, 'Restaurant created', 201);
  } catch { sendError(res, 'Failed to create restaurant', 500); }
};

export const updateRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.restaurant.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Restaurant not found', 404);
    const restaurant = await prisma.restaurant.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, restaurant);
  } catch { sendError(res, 'Failed to update restaurant', 500); }
};

export const deleteRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.restaurant.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Restaurant deactivated');
  } catch { sendError(res, 'Failed to delete restaurant', 500); }
};

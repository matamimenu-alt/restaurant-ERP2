import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getBranches = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const companyId = req.user!.companyId;
    const where: Record<string, unknown> = { companyId, isActive: true };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId;
    const [data, total] = await Promise.all([
      prisma.branch.findMany({ where, include: { restaurant: { select: { nameAr: true, nameEn: true } } }, skip, take: limit }),
      prisma.branch.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch branches', 500); }
};

export const getBranch = async (req: AuthRequest, res: Response) => {
  try {
    const branch = await prisma.branch.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: { restaurant: true },
    });
    if (!branch) return sendError(res, 'Branch not found', 404);
    sendSuccess(res, branch);
  } catch { sendError(res, 'Failed to fetch branch', 500); }
};

export const createBranch = async (req: AuthRequest, res: Response) => {
  try {
    const branch = await prisma.branch.create({ data: { ...req.body, companyId: req.user!.companyId } });
    sendSuccess(res, branch, 'Branch created', 201);
  } catch { sendError(res, 'Failed to create branch', 500); }
};

export const updateBranch = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.branch.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Branch not found', 404);
    const branch = await prisma.branch.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, branch);
  } catch { sendError(res, 'Failed to update branch', 500); }
};

export const deleteBranch = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.branch.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Branch deactivated');
  } catch { sendError(res, 'Failed to delete branch', 500); }
};

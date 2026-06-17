import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where: { companyId: req.user!.companyId },
        select: { id: true, email: true, nameAr: true, nameEn: true, role: true, isActive: true, lastLogin: true, createdAt: true },
        skip, take: limit,
      }),
      prisma.user.count({ where: { companyId: req.user!.companyId } }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch users', 500); }
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, nameAr, nameEn, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { companyId_email: { companyId: req.user!.companyId, email: email.toLowerCase() } } });
    if (existing) return sendError(res, 'Email already in use', 400);
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { companyId: req.user!.companyId, email: email.toLowerCase(), password: hashed, nameAr, nameEn, role },
      select: { id: true, email: true, nameAr: true, nameEn: true, role: true, isActive: true },
    });
    sendSuccess(res, user, 'User created', 201);
  } catch { sendError(res, 'Failed to create user', 500); }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { password, ...data } = req.body;
    const updateData: Record<string, unknown> = { ...data };
    if (password) updateData.password = await bcrypt.hash(password, 12);
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
      select: { id: true, email: true, nameAr: true, nameEn: true, role: true, isActive: true },
    });
    sendSuccess(res, user);
  } catch { sendError(res, 'Failed to update user', 500); }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'User deactivated');
  } catch { sendError(res, 'Failed to deactivate user', 500); }
};

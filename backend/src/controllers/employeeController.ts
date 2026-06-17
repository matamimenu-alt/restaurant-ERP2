import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const where: Record<string, unknown> = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId;
    if (req.query.branchId) where.branchId = req.query.branchId;
    if (req.query.isActive !== undefined) where.isActive = req.query.isActive === 'true';
    const [data, total] = await Promise.all([
      prisma.employee.findMany({
        where, skip, take: limit, orderBy: { nameAr: 'asc' },
        include: {
          restaurant: { select: { nameAr: true } },
          branch: { select: { nameAr: true } },
        },
      }),
      prisma.employee.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch employees', 500); }
};

export const getEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const employee = await prisma.employee.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: { restaurant: true, branch: true },
    });
    if (!employee) return sendError(res, 'Employee not found', 404);
    sendSuccess(res, employee);
  } catch { sendError(res, 'Failed to fetch employee', 500); }
};

export const createEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        ...req.body, companyId: req.user!.companyId,
        joiningDate: new Date(req.body.joiningDate),
        iqamaExpiryDate: req.body.iqamaExpiryDate ? new Date(req.body.iqamaExpiryDate) : undefined,
      },
    });
    sendSuccess(res, employee, 'Employee created', 201);
  } catch { sendError(res, 'Failed to create employee', 500); }
};

export const updateEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.employee.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Employee not found', 404);
    const data = { ...req.body };
    if (data.joiningDate) data.joiningDate = new Date(data.joiningDate);
    if (data.iqamaExpiryDate) data.iqamaExpiryDate = new Date(data.iqamaExpiryDate);
    const employee = await prisma.employee.update({ where: { id: req.params.id }, data });
    sendSuccess(res, employee);
  } catch { sendError(res, 'Failed to update employee', 500); }
};

export const deleteEmployee = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.employee.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Employee deactivated');
  } catch { sendError(res, 'Failed to deactivate employee', 500); }
};

export const getIqamaAlerts = async (req: AuthRequest, res: Response) => {
  try {
    const daysAhead = parseInt(req.query.days as string) || 60;
    const future = new Date();
    future.setDate(future.getDate() + daysAhead);
    const employees = await prisma.employee.findMany({
      where: {
        companyId: req.user!.companyId, isActive: true,
        iqamaExpiryDate: { lte: future },
      },
      include: { restaurant: { select: { nameAr: true } } },
      orderBy: { iqamaExpiryDate: 'asc' },
    });
    sendSuccess(res, employees);
  } catch { sendError(res, 'Failed to fetch iqama alerts', 500); }
};

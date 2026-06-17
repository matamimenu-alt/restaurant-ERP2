import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getPayrollRuns = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const where: Record<string, unknown> = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId;
    const [data, total] = await Promise.all([
      prisma.payrollRun.findMany({
        where, skip, take: limit, orderBy: [{ year: 'desc' }, { month: 'desc' }],
        include: { restaurant: { select: { nameAr: true } } },
      }),
      prisma.payrollRun.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch payroll runs', 500); }
};

export const getPayrollRun = async (req: AuthRequest, res: Response) => {
  try {
    const run = await prisma.payrollRun.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: {
        lines: {
          include: { employee: { select: { nameAr: true, nameEn: true, position: true } } },
        },
        restaurant: true,
      },
    });
    if (!run) return sendError(res, 'Payroll run not found', 404);
    sendSuccess(res, run);
  } catch { sendError(res, 'Failed to fetch payroll run', 500); }
};

export const createPayrollRun = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, month, year, lines } = req.body;

    const existing = await prisma.payrollRun.findUnique({
      where: { companyId_restaurantId_month_year: { companyId: req.user!.companyId, restaurantId, month, year } },
    });
    if (existing) return sendError(res, 'Payroll run already exists for this period', 400);

    const processedLines = lines.map((l: {
      employeeId: string; basicSalary: number; housingAllowance: number;
      transportAllowance: number; otherAllowances?: number; absenceDeduction?: number;
      lateDeduction?: number; advanceDeduction?: number; penaltyDeduction?: number;
    }) => {
      const totalEarnings = l.basicSalary + l.housingAllowance + l.transportAllowance + (l.otherAllowances || 0);
      const totalDeductions = (l.absenceDeduction || 0) + (l.lateDeduction || 0) + (l.advanceDeduction || 0) + (l.penaltyDeduction || 0);
      return { ...l, totalEarnings, totalDeductions, netSalary: totalEarnings - totalDeductions };
    });

    const run = await prisma.payrollRun.create({
      data: {
        companyId: req.user!.companyId, restaurantId, month, year,
        processedBy: req.user!.userId,
        totalBasic: processedLines.reduce((s: number, l: { basicSalary: number }) => s + l.basicSalary, 0),
        totalAllowances: processedLines.reduce((s: number, l: { housingAllowance: number; transportAllowance: number; otherAllowances?: number }) => s + l.housingAllowance + l.transportAllowance + (l.otherAllowances || 0), 0),
        totalDeductions: processedLines.reduce((s: number, l: { totalDeductions: number }) => s + l.totalDeductions, 0),
        totalNet: processedLines.reduce((s: number, l: { netSalary: number }) => s + l.netSalary, 0),
        lines: { create: processedLines },
      },
      include: { lines: { include: { employee: { select: { nameAr: true, position: true } } } } },
    });
    sendSuccess(res, run, 'Payroll run created', 201);
  } catch (err) { console.error(err); sendError(res, 'Failed to create payroll run', 500); }
};

export const approvePayrollRun = async (req: AuthRequest, res: Response) => {
  try {
    const run = await prisma.payrollRun.update({
      where: { id: req.params.id },
      data: { status: 'APPROVED', processedAt: new Date() },
    });
    sendSuccess(res, run, 'Payroll approved');
  } catch { sendError(res, 'Failed to approve payroll', 500); }
};

export const generatePayrollFromEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const { restaurantId, month, year } = req.query;
    const employees = await prisma.employee.findMany({
      where: {
        companyId: req.user!.companyId,
        restaurantId: restaurantId as string,
        isActive: true,
      },
    });

    const lines = employees.map(e => {
      const totalEarnings = Number(e.basicSalary) + Number(e.housingAllowance) + Number(e.transportAllowance);
      return {
        employeeId: e.id, basicSalary: Number(e.basicSalary),
        housingAllowance: Number(e.housingAllowance), transportAllowance: Number(e.transportAllowance),
        otherAllowances: 0, absenceDeduction: 0, lateDeduction: 0, advanceDeduction: 0, penaltyDeduction: 0,
        totalEarnings, totalDeductions: 0, netSalary: totalEarnings,
        employee: { nameAr: e.nameAr, nameEn: e.nameEn, position: e.position },
      };
    });

    sendSuccess(res, { month: Number(month), year: Number(year), restaurantId, lines });
  } catch { sendError(res, 'Failed to generate payroll data', 500); }
};

export const getSalaryAdvances = async (req: AuthRequest, res: Response) => {
  try {
    const advances = await prisma.salaryAdvance.findMany({
      where: { employee: { companyId: req.user!.companyId }, isPaid: false },
      include: { employee: { select: { nameAr: true, nameEn: true } } },
      orderBy: { date: 'desc' },
    });
    sendSuccess(res, advances);
  } catch { sendError(res, 'Failed to fetch advances', 500); }
};

export const createSalaryAdvance = async (req: AuthRequest, res: Response) => {
  try {
    const advance = await prisma.salaryAdvance.create({
      data: { ...req.body, createdBy: req.user!.userId, date: new Date(req.body.date) },
    });
    sendSuccess(res, advance, 'Advance created', 201);
  } catch { sendError(res, 'Failed to create advance', 500); }
};

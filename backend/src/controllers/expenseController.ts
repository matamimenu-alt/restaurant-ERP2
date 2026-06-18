import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination, getDateRange } from '../utils/pagination';
import { Prisma } from '@prisma/client';

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { from, to } = getDateRange(req);
    const where: Prisma.ExpenseWhereInput = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    if (req.query.branchId) where.branchId = req.query.branchId as string;
    if (req.query.categoryId) where.categoryId = req.query.categoryId as string;
    if (from || to) where.date = { gte: from, lte: to };
    const [data, total, totals] = await Promise.all([
      prisma.expense.findMany({
        where, skip, take: limit, orderBy: { date: 'desc' },
        include: {
          category: { select: { nameAr: true, nameEn: true, type: true } },
          restaurant: { select: { nameAr: true } },
          branch: { select: { nameAr: true } },
        },
      }),
      prisma.expense.count({ where }),
      prisma.expense.aggregate({ where, _sum: { amount: true } }),
    ]);
    sendPaginated(res, { expenses: data, totalAmount: totals._sum.amount || 0 } as never, total, page, limit);
  } catch { sendError(res, 'Failed to fetch expenses', 500); }
};

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await prisma.expense.create({
      data: { ...req.body, companyId: req.user!.companyId, createdBy: req.user!.userId, date: new Date(req.body.date) },
    });
    sendSuccess(res, expense, 'Expense created', 201);
  } catch { sendError(res, 'Failed to create expense', 500); }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.expense.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Expense not found', 404);
    const expense = await prisma.expense.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, expense);
  } catch { sendError(res, 'Failed to update expense', 500); }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.expense.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Expense deleted');
  } catch { sendError(res, 'Failed to delete expense', 500); }
};

export const getExpenseCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await prisma.expenseCategory.findMany({
      where: { companyId: req.user!.companyId },
      include: { children: true },
    });
    sendSuccess(res, categories);
  } catch { sendError(res, 'Failed to fetch categories', 500); }
};

export const createExpenseCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = await prisma.expenseCategory.create({ data: { ...req.body, companyId: req.user!.companyId } });
    sendSuccess(res, category, 'Category created', 201);
  } catch { sendError(res, 'Failed to create category', 500); }
};

export const updateExpenseCategory = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.expenseCategory.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Category not found', 404);
    const category = await prisma.expenseCategory.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, category);
  } catch { sendError(res, 'Failed to update category', 500); }
};

export const deleteExpenseCategory = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.expenseCategory.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Category not found', 404);
    const hasExpenses = await prisma.expense.count({ where: { categoryId: req.params.id } });
    if (hasExpenses > 0) return sendError(res, 'Cannot delete category with existing expenses', 400);
    await prisma.expenseCategory.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Category deleted');
  } catch { sendError(res, 'Failed to delete category', 500); }
};

export const getExpenseSummary = async (req: AuthRequest, res: Response) => {
  try {
    const { from, to } = getDateRange(req);
    const where: Prisma.ExpenseWhereInput = { companyId: req.user!.companyId };
    if (from || to) where.date = { gte: from, lte: to };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;

    const byCategory = await prisma.expense.groupBy({
      by: ['categoryId'], where, _sum: { amount: true },
    });
    const byPayment = await prisma.expense.groupBy({
      by: ['paymentMethod'], where, _sum: { amount: true },
    });
    const total = byCategory.reduce((s, c) => s + Number(c._sum.amount || 0), 0);
    sendSuccess(res, { total, byCategory, byPayment });
  } catch { sendError(res, 'Failed to fetch expense summary', 500); }
};

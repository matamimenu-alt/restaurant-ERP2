import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getItems = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const search = req.query.search as string;
    const where: Record<string, unknown> = { companyId: req.user!.companyId, isActive: true };
    if (req.query.categoryId) where.categoryId = req.query.categoryId;
    if (search) where.OR = [{ nameAr: { contains: search, mode: 'insensitive' } }, { nameEn: { contains: search, mode: 'insensitive' } }, { code: { contains: search, mode: 'insensitive' } }];
    const [data, total] = await Promise.all([
      prisma.inventoryItem.findMany({
        where, skip, take: limit, orderBy: { nameAr: 'asc' },
        include: { category: { select: { nameAr: true, nameEn: true, type: true } } },
      }),
      prisma.inventoryItem.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch items', 500); }
};

export const getItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await prisma.inventoryItem.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: {
        category: true,
        locations: { include: { branch: { select: { nameAr: true } } } },
      },
    });
    if (!item) return sendError(res, 'Item not found', 404);
    sendSuccess(res, item);
  } catch { sendError(res, 'Failed to fetch item', 500); }
};

export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const item = await prisma.inventoryItem.create({ data: { ...req.body, companyId: req.user!.companyId } });
    sendSuccess(res, item, 'Item created', 201);
  } catch { sendError(res, 'Failed to create item', 500); }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.inventoryItem.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Item not found', 404);
    const item = await prisma.inventoryItem.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, item);
  } catch { sendError(res, 'Failed to update item', 500); }
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.inventoryItem.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Item deactivated');
  } catch { sendError(res, 'Failed to delete item', 500); }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await prisma.inventoryCategory.findMany({
      where: { companyId: req.user!.companyId },
      include: { _count: { select: { items: true } } },
      orderBy: { nameAr: 'asc' },
    });
    sendSuccess(res, categories);
  } catch { sendError(res, 'Failed to fetch categories', 500); }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { nameAr, nameEn, type } = req.body;
    const cat = await prisma.inventoryCategory.create({
      data: { companyId: req.user!.companyId, nameAr, nameEn, type: type || 'FOOD' },
    });
    sendSuccess(res, cat, 'Category created', 201);
  } catch { sendError(res, 'Failed to create category', 500); }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.inventoryCategory.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Not found', 404);
    const cat = await prisma.inventoryCategory.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, cat);
  } catch { sendError(res, 'Failed to update category', 500); }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.inventoryCategory.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Not found', 404);
    const itemCount = await prisma.inventoryItem.count({ where: { categoryId: req.params.id } });
    if (itemCount > 0) return sendError(res, `Cannot delete: ${itemCount} items use this category`, 400);
    await prisma.inventoryCategory.delete({ where: { id: req.params.id } });
    sendSuccess(res, null, 'Deleted');
  } catch { sendError(res, 'Failed to delete category', 500); }
};

export const createStockMovement = async (req: AuthRequest, res: Response) => {
  try {
    const { branchId, itemId, type, quantity, unitCost, notes, reference } = req.body;

    const movement = await prisma.$transaction(async (tx) => {
      const m = await tx.stockMovement.create({
        data: {
          companyId: req.user!.companyId, branchId, itemId, type, quantity, unitCost,
          totalCost: quantity * (unitCost || 0), notes, reference, createdBy: req.user!.userId,
        },
      });

      const qtyChange = ['IN', 'TRANSFER_IN'].includes(type) ? quantity : -quantity;
      await tx.inventoryLocation.upsert({
        where: { branchId_itemId: { branchId, itemId } },
        create: { branchId, itemId, quantity: Math.max(0, qtyChange), averageCost: unitCost || 0 },
        update: { quantity: { increment: qtyChange }, lastUpdated: new Date() },
      });
      return m;
    });
    sendSuccess(res, movement, 'Stock movement created', 201);
  } catch { sendError(res, 'Failed to create stock movement', 500); }
};

export const getStockMovements = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const where: Record<string, unknown> = { companyId: req.user!.companyId };
    if (req.query.branchId) where.branchId = req.query.branchId;
    if (req.query.itemId) where.itemId = req.query.itemId;
    const [data, total] = await Promise.all([
      prisma.stockMovement.findMany({
        where, skip, take: limit, orderBy: { createdAt: 'desc' },
        include: {
          item: { select: { nameAr: true, nameEn: true, unit: true } },
          branch: { select: { nameAr: true } },
        },
      }),
      prisma.stockMovement.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch movements', 500); }
};

export const getLowStockItems = async (req: AuthRequest, res: Response) => {
  try {
    const branchId = req.query.branchId as string;
    const locations = await prisma.inventoryLocation.findMany({
      where: { branch: { companyId: req.user!.companyId }, ...(branchId ? { branchId } : {}) },
      include: { item: true, branch: { select: { nameAr: true } } },
    });
    const lowStock = locations.filter(l => Number(l.quantity) <= Number(l.item.minStock) && Number(l.item.minStock) > 0);
    sendSuccess(res, lowStock);
  } catch { sendError(res, 'Failed to fetch low stock', 500); }
};

export const createPhysicalCount = async (req: AuthRequest, res: Response) => {
  try {
    const { branchId, date, notes, lines } = req.body;
    const count = await prisma.$transaction(async (tx) => {
      const c = await tx.physicalCount.create({
        data: {
          companyId: req.user!.companyId, branchId, date: new Date(date), notes,
          createdBy: req.user!.userId,
          lines: {
            create: lines.map((l: { itemId: string; systemQty: number; countedQty: number; unitCost: number }) => ({
              itemId: l.itemId, systemQty: l.systemQty, countedQty: l.countedQty,
              variance: l.countedQty - l.systemQty, unitCost: l.unitCost,
            })),
          },
        },
        include: { lines: true },
      });
      return c;
    });
    sendSuccess(res, count, 'Physical count created', 201);
  } catch { sendError(res, 'Failed to create physical count', 500); }
};

export const completePhysicalCount = async (req: AuthRequest, res: Response) => {
  try {
    const count = await prisma.physicalCount.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: { lines: true },
    });
    if (!count) return sendError(res, 'Count not found', 404);

    await prisma.$transaction(async (tx) => {
      for (const line of count.lines) {
        await tx.inventoryLocation.upsert({
          where: { branchId_itemId: { branchId: count.branchId, itemId: line.itemId } },
          create: { branchId: count.branchId, itemId: line.itemId, quantity: line.countedQty, averageCost: line.unitCost },
          update: { quantity: line.countedQty, lastUpdated: new Date() },
        });
      }
      await tx.physicalCount.update({
        where: { id: count.id },
        data: { status: 'COMPLETED', completedBy: req.user!.userId },
      });
    });
    sendSuccess(res, null, 'Physical count completed');
  } catch { sendError(res, 'Failed to complete count', 500); }
};

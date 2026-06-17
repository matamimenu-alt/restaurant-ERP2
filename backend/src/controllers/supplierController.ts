import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination } from '../utils/pagination';

export const getSuppliers = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const search = req.query.search as string;
    const where: Record<string, unknown> = { companyId: req.user!.companyId };
    if (search) where.OR = [{ nameAr: { contains: search, mode: 'insensitive' } }, { nameEn: { contains: search, mode: 'insensitive' } }];
    const [data, total] = await Promise.all([
      prisma.supplier.findMany({ where, skip, take: limit, orderBy: { nameAr: 'asc' } }),
      prisma.supplier.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch suppliers', 500); }
};

export const getSupplier = async (req: AuthRequest, res: Response) => {
  try {
    const supplier = await prisma.supplier.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!supplier) return sendError(res, 'Supplier not found', 404);
    sendSuccess(res, supplier);
  } catch { sendError(res, 'Failed to fetch supplier', 500); }
};

export const createSupplier = async (req: AuthRequest, res: Response) => {
  try {
    const supplier = await prisma.supplier.create({ data: { ...req.body, companyId: req.user!.companyId } });
    sendSuccess(res, supplier, 'Supplier created', 201);
  } catch { sendError(res, 'Failed to create supplier', 500); }
};

export const updateSupplier = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.supplier.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Supplier not found', 404);
    const supplier = await prisma.supplier.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, supplier);
  } catch { sendError(res, 'Failed to update supplier', 500); }
};

export const deleteSupplier = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.supplier.update({ where: { id: req.params.id }, data: { isActive: false } });
    sendSuccess(res, null, 'Supplier deactivated');
  } catch { sendError(res, 'Failed to delete supplier', 500); }
};

export const getSupplierPriceHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { supplierId, itemId } = req.query;
    if (!supplierId || !itemId) return sendError(res, 'supplierId and itemId required', 400);

    const lines = await prisma.purchaseInvoiceLine.findMany({
      where: {
        itemId: itemId as string,
        invoice: { supplierId: supplierId as string, companyId: req.user!.companyId, status: 'POSTED' },
      },
      include: { invoice: { select: { invoiceDate: true } } },
      orderBy: { invoice: { invoiceDate: 'desc' } },
    });

    if (!lines.length) return sendSuccess(res, null);

    const prices = lines.map(l => Number(l.unitPrice));
    const lastLine = lines[0];

    sendSuccess(res, {
      lastPrice: Number(lastLine.unitPrice),
      averagePrice: prices.reduce((a, b) => a + b, 0) / prices.length,
      highestPrice: Math.max(...prices),
      lowestPrice: Math.min(...prices),
      lastPurchaseDate: lastLine.invoice.invoiceDate,
      totalPurchases: lines.length,
    });
  } catch { sendError(res, 'Failed to fetch price history', 500); }
};

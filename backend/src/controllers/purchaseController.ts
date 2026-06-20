import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { getPagination, getDateRange } from '../utils/pagination';
import { Prisma } from '@prisma/client';

export const getPurchaseInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { from, to } = getDateRange(req);
    const where: Prisma.PurchaseInvoiceWhereInput = { companyId: req.user!.companyId };
    if (req.query.supplierId) where.supplierId = req.query.supplierId as string;
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    if (from || to) where.invoiceDate = { gte: from, lte: to };
    const [data, total] = await Promise.all([
      prisma.purchaseInvoice.findMany({
        where, skip, take: limit, orderBy: { invoiceDate: 'desc' },
        include: {
          supplier: { select: { nameAr: true, nameEn: true } },
          restaurant: { select: { nameAr: true, nameEn: true } },
          lines: { include: { item: { select: { nameAr: true, nameEn: true, unit: true } } } },
        },
      }),
      prisma.purchaseInvoice.count({ where }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch invoices', 500); }
};

export const getPurchaseInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await prisma.purchaseInvoice.findFirst({
      where: { id: req.params.id, companyId: req.user!.companyId },
      include: {
        supplier: true,
        restaurant: true,
        branch: true,
        lines: { include: { item: true } },
        returns: true,
      },
    });
    if (!invoice) return sendError(res, 'Invoice not found', 404);
    sendSuccess(res, invoice);
  } catch { sendError(res, 'Failed to fetch invoice', 500); }
};

export const createPurchaseInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { lines, ...invoiceData } = req.body;

    const invoice = await prisma.$transaction(async (tx) => {
      const inv = await tx.purchaseInvoice.create({
        data: {
          ...invoiceData,
          companyId: req.user!.companyId,
          createdBy: req.user!.userId,
          invoiceDate: new Date(invoiceData.invoiceDate),
          lines: {
            create: lines.map((l: { itemId: string; quantity: number; unitPrice: number; vatRate?: number }) => {
              const vatRate = l.vatRate ?? 15;
              const vatAmount = (l.unitPrice * l.quantity * vatRate) / 100;
              const total = l.unitPrice * l.quantity + vatAmount;
              return { itemId: l.itemId, quantity: l.quantity, unitPrice: l.unitPrice, vatRate, vatAmount, total };
            }),
          },
        },
        include: { lines: true },
      });

      // Update inventory & item prices
      for (const line of lines) {
        const branchId = invoiceData.branchId;
        if (branchId) {
          await tx.inventoryLocation.upsert({
            where: { branchId_itemId: { branchId, itemId: line.itemId } },
            create: { branchId, itemId: line.itemId, quantity: line.quantity, averageCost: line.unitPrice },
            update: {
              quantity: { increment: line.quantity },
              averageCost: line.unitPrice,
              lastUpdated: new Date(),
            },
          });
          await tx.stockMovement.create({
            data: {
              companyId: req.user!.companyId, branchId, itemId: line.itemId,
              type: 'IN', quantity: line.quantity, unitCost: line.unitPrice,
              totalCost: line.quantity * line.unitPrice, reference: inv.invoiceNumber,
              createdBy: req.user!.userId,
            },
          });
        }
        await tx.inventoryItem.update({
          where: { id: line.itemId },
          data: { lastPurchasePrice: line.unitPrice },
        });
      }
      return inv;
    });

    sendSuccess(res, invoice, 'Invoice created', 201);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to create invoice', 500);
  }
};

export const updatePurchaseInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.purchaseInvoice.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Invoice not found', 404);
    if (existing.status === 'POSTED') return sendError(res, 'Cannot edit posted invoice', 400);
    const invoice = await prisma.purchaseInvoice.update({ where: { id: req.params.id }, data: req.body });
    sendSuccess(res, invoice);
  } catch { sendError(res, 'Failed to update invoice', 500); }
};

export const createPurchaseReturn = async (req: AuthRequest, res: Response) => {
  try {
    const { invoiceId, returnDate, reason, returnType, lines } = req.body;
    const invoice = await prisma.purchaseInvoice.findFirst({ where: { id: invoiceId, companyId: req.user!.companyId }, include: { lines: true } });
    if (!invoice) return sendError(res, 'Invoice not found', 404);

    const returnLines = returnType === 'FULL' ? invoice.lines.map(l => ({
      invoiceLineId: l.id, itemId: l.itemId, quantity: Number(l.quantity), unitPrice: Number(l.unitPrice),
      total: Number(l.quantity) * Number(l.unitPrice),
    })) : lines;

    const subtotal = returnLines.reduce((s: number, l: { total: number }) => s + l.total, 0);
    const vatAmount = subtotal * 0.15;

    const ret = await prisma.$transaction(async (tx) => {
      const r = await tx.purchaseReturn.create({
        data: {
          companyId: req.user!.companyId, invoiceId, returnDate: new Date(returnDate),
          reason, returnType, subtotal, vatAmount, total: subtotal + vatAmount,
          createdBy: req.user!.userId,
          lines: { create: returnLines },
        },
      });
      // Reverse inventory
      if (invoice.branchId) {
        for (const line of returnLines) {
          await tx.inventoryLocation.updateMany({
            where: { branchId: invoice.branchId, itemId: line.itemId },
            data: { quantity: { decrement: line.quantity } },
          });
        }
      }
      return r;
    });
    sendSuccess(res, ret, 'Return created', 201);
  } catch (err) {
    console.error(err);
    sendError(res, 'Failed to create return', 500);
  }
};

export const getPurchaseReturns = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const [data, total] = await Promise.all([
      prisma.purchaseReturn.findMany({
        where: { companyId: req.user!.companyId },
        include: { invoice: { include: { supplier: { select: { nameAr: true } } } }, lines: { include: { item: { select: { nameAr: true } } } } },
        skip, take: limit, orderBy: { returnDate: 'desc' },
      }),
      prisma.purchaseReturn.count({ where: { companyId: req.user!.companyId } }),
    ]);
    sendPaginated(res, data, total, page, limit);
  } catch { sendError(res, 'Failed to fetch returns', 500); }
};

export const deleteAllInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const where: Prisma.PurchaseInvoiceWhereInput = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    const invoices = await prisma.purchaseInvoice.findMany({ where, select: { id: true } });
    const ids = invoices.map(i => i.id);
    if (ids.length === 0) return sendSuccess(res, { deleted: 0 });
    await prisma.purchaseInvoiceLine.deleteMany({ where: { invoiceId: { in: ids } } });
    const result = await prisma.purchaseInvoice.deleteMany({ where: { id: { in: ids } } });
    sendSuccess(res, { deleted: result.count });
  } catch (err) { console.error(err); sendError(res, 'Failed to delete all invoices', 500); }
};

export const getAllInvoiceIds = async (req: AuthRequest, res: Response) => {
  try {
    const where: Prisma.PurchaseInvoiceWhereInput = { companyId: req.user!.companyId };
    if (req.query.restaurantId) where.restaurantId = req.query.restaurantId as string;
    if (req.query.supplierId) where.supplierId = req.query.supplierId as string;
    if (req.query.from || req.query.to) {
      const from = req.query.from ? new Date(req.query.from as string) : undefined;
      const to = req.query.to ? new Date(new Date(req.query.to as string).setHours(23,59,59)) : undefined;
      where.invoiceDate = { gte: from, lte: to };
    }
    const invoices = await prisma.purchaseInvoice.findMany({ where, select: { id: true } });
    sendSuccess(res, { ids: invoices.map(i => i.id), total: invoices.length });
  } catch { sendError(res, 'Failed to get invoice ids', 500); }
};

export const bulkDeleteInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body as { ids: string[] };
    if (!ids || !ids.length) return sendError(res, 'No ids provided', 400);
    const invoices = await prisma.purchaseInvoice.findMany({ where: { id: { in: ids }, companyId: req.user!.companyId }, select: { id: true } });
    const validIds = invoices.map(i => i.id);
    await prisma.purchaseInvoiceLine.deleteMany({ where: { invoiceId: { in: validIds } } });
    await prisma.purchaseInvoice.deleteMany({ where: { id: { in: validIds } } });
    sendSuccess(res, { deleted: validIds.length });
  } catch { sendError(res, 'Failed to bulk delete', 500); }
};

export const transferInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const { ids, targetRestaurantId } = req.body as { ids: string[]; targetRestaurantId: string };
    if (!ids || !ids.length || !targetRestaurantId) return sendError(res, 'Missing ids or targetRestaurantId', 400);
    const restaurant = await prisma.restaurant.findFirst({ where: { id: targetRestaurantId, companyId: req.user!.companyId } });
    if (!restaurant) return sendError(res, 'Target restaurant not found', 404);
    await prisma.purchaseInvoice.updateMany({
      where: { id: { in: ids }, companyId: req.user!.companyId },
      data: { restaurantId: targetRestaurantId },
    });
    sendSuccess(res, { transferred: ids.length, toRestaurant: restaurant.nameAr });
  } catch { sendError(res, 'Failed to transfer invoices', 500); }
};

export const getPurchaseSummaryByRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const from = req.query.from ? new Date(req.query.from as string) : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;
    const where: Prisma.PurchaseInvoiceWhereInput = { companyId: req.user!.companyId };
    if (from || to) where.invoiceDate = { gte: from, lte: to ? new Date(new Date(to as unknown as string).setHours(23, 59, 59)) : undefined };

    const invoices = await prisma.purchaseInvoice.findMany({
      where,
      select: {
        restaurantId: true,
        restaurant: { select: { nameAr: true, nameEn: true } },
        paymentMethod: true,
        invoiceType: true,
        subtotal: true,
        vatAmount: true,
        total: true,
      },
    });

    const byRestaurant: Record<string, {
      restaurantId: string; nameAr: string; nameEn: string;
      cashTotal: number; cardTotal: number; creditTotal: number;
      taxableNet: number; inputVat: number; nonTaxableTotal: number; grandTotal: number;
      invoiceCount: number;
    }> = {};

    for (const inv of invoices) {
      const rid = inv.restaurantId || '__none__';
      if (!byRestaurant[rid]) {
        byRestaurant[rid] = {
          restaurantId: rid,
          nameAr: inv.restaurant?.nameAr || 'غير محدد',
          nameEn: inv.restaurant?.nameEn || 'Unassigned',
          cashTotal: 0, cardTotal: 0, creditTotal: 0,
          taxableNet: 0, inputVat: 0, nonTaxableTotal: 0, grandTotal: 0, invoiceCount: 0,
        };
      }
      const r = byRestaurant[rid];
      r.invoiceCount++;
      r.grandTotal += Number(inv.total);
      if (inv.paymentMethod === 'CASH') r.cashTotal += Number(inv.total);
      else if (inv.paymentMethod === 'BANK') r.cardTotal += Number(inv.total);
      else r.creditTotal += Number(inv.total);
      if (inv.invoiceType === 'TAX') { r.taxableNet += Number(inv.subtotal); r.inputVat += Number(inv.vatAmount); }
      else r.nonTaxableTotal += Number(inv.subtotal);
    }

    const rows = Object.values(byRestaurant).sort((a, b) => b.grandTotal - a.grandTotal);
    const totals = rows.reduce((acc, r) => ({
      cashTotal: acc.cashTotal + r.cashTotal,
      cardTotal: acc.cardTotal + r.cardTotal,
      creditTotal: acc.creditTotal + r.creditTotal,
      taxableNet: acc.taxableNet + r.taxableNet,
      inputVat: acc.inputVat + r.inputVat,
      nonTaxableTotal: acc.nonTaxableTotal + r.nonTaxableTotal,
      grandTotal: acc.grandTotal + r.grandTotal,
      invoiceCount: acc.invoiceCount + r.invoiceCount,
    }), { cashTotal: 0, cardTotal: 0, creditTotal: 0, taxableNet: 0, inputVat: 0, nonTaxableTotal: 0, grandTotal: 0, invoiceCount: 0 });

    sendSuccess(res, { byRestaurant: rows, totals });
  } catch (err) { console.error(err); sendError(res, 'Failed to fetch summary', 500); }
};

export const deletePurchaseInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.purchaseInvoice.findFirst({ where: { id: req.params.id, companyId: req.user!.companyId } });
    if (!existing) return sendError(res, 'Invoice not found', 404);
    await prisma.purchaseInvoiceLine.deleteMany({ where: { invoiceId: req.params.id } });
    await prisma.purchaseInvoice.delete({ where: { id: req.params.id } });
    sendSuccess(res, { deleted: true });
  } catch { sendError(res, 'Failed to delete invoice', 500); }
};

export const getPurchaseLines = async (req: AuthRequest, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const invoiceWhere: Prisma.PurchaseInvoiceWhereInput = { companyId: req.user!.companyId };
    if (req.query.supplierId) invoiceWhere.supplierId = req.query.supplierId as string;
    if (req.query.paymentMethod) invoiceWhere.paymentMethod = req.query.paymentMethod as 'CASH' | 'BANK' | 'CREDIT';
    if (req.query.invoiceType) invoiceWhere.invoiceType = req.query.invoiceType as string;
    const from = req.query.from ? new Date(req.query.from as string) : undefined;
    const to = req.query.to ? new Date(req.query.to as string) : undefined;
    if (from || to) invoiceWhere.invoiceDate = { gte: from, lte: to ? new Date(new Date(to).setHours(23, 59, 59)) : undefined };

    const lineWhere: Prisma.PurchaseInvoiceLineWhereInput = { invoice: invoiceWhere };
    if (req.query.categoryId) lineWhere.item = { categoryId: req.query.categoryId as string };
    if (req.query.search) lineWhere.item = { ...lineWhere.item as object, OR: [{ nameAr: { contains: req.query.search as string } }, { nameEn: { contains: req.query.search as string, mode: 'insensitive' } }] };

    const [data, total] = await Promise.all([
      prisma.purchaseInvoiceLine.findMany({
        where: lineWhere, skip, take: limit,
        orderBy: { invoice: { invoiceDate: 'desc' } },
        include: {
          item: { select: { nameAr: true, nameEn: true, unit: true, category: { select: { nameAr: true, nameEn: true } } } },
          invoice: {
            select: {
              id: true, invoiceDate: true, invoiceNumber: true, invoiceType: true, paymentMethod: true,
              restaurantId: true,
              supplier: { select: { nameAr: true, nameEn: true } },
              restaurant: { select: { nameAr: true, nameEn: true } },
            },
          },
        },
      }),
      prisma.purchaseInvoiceLine.count({ where: lineWhere }),
    ]);

    // Summary aggregation
    const summaryData = await prisma.purchaseInvoiceLine.findMany({
      where: lineWhere,
      include: { invoice: { select: { invoiceType: true, paymentMethod: true } } },
    });

    let taxableNet = 0, inputVat = 0, nonTaxableTotal = 0;
    for (const line of summaryData) {
      const net = Number(line.unitPrice) * Number(line.quantity);
      const vat = Number(line.vatAmount);
      if (line.invoice.invoiceType === 'TAX') {
        taxableNet += net;
        inputVat += vat;
      } else {
        nonTaxableTotal += net;
      }
    }

    const cashTotal = summaryData.filter(l => l.invoice.paymentMethod === 'CASH').reduce((s, l) => s + Number(l.unitPrice) * Number(l.quantity) + Number(l.vatAmount), 0);
    const cardTotal = summaryData.filter(l => l.invoice.paymentMethod === 'BANK').reduce((s, l) => s + Number(l.unitPrice) * Number(l.quantity) + Number(l.vatAmount), 0);
    const creditTotal = summaryData.filter(l => l.invoice.paymentMethod === 'CREDIT').reduce((s, l) => s + Number(l.unitPrice) * Number(l.quantity) + Number(l.vatAmount), 0);

    sendPaginated(res, data, total, page, limit, {
      summary: { taxableNet, inputVat, nonTaxableTotal, taxableWithVat: taxableNet + inputVat, cashTotal, cardTotal, creditTotal, totalPurchases: cashTotal + cardTotal + creditTotal }
    });
  } catch (err) { console.error(err); sendError(res, 'Failed to fetch lines', 500); }
};

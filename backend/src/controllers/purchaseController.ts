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
              invoiceDate: true, invoiceNumber: true, invoiceType: true, paymentMethod: true,
              supplier: { select: { nameAr: true, nameEn: true } },
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

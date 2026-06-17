import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

export const getAlerts = async (req: AuthRequest, res: Response) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { companyId: req.user!.companyId, isRead: false },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    sendSuccess(res, alerts);
  } catch { sendError(res, 'Failed to fetch alerts', 500); }
};

export const markAlertRead = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.alert.update({ where: { id: req.params.id }, data: { isRead: true } });
    sendSuccess(res, null, 'Alert marked as read');
  } catch { sendError(res, 'Failed to update alert', 500); }
};

export const markAllRead = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.alert.updateMany({ where: { companyId: req.user!.companyId, isRead: false }, data: { isRead: true } });
    sendSuccess(res, null, 'All alerts marked as read');
  } catch { sendError(res, 'Failed to update alerts', 500); }
};

export const generateAlerts = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const alerts: { companyId: string; type: string; title: string; titleAr: string; message: string; messageAr: string; severity: string; entityId?: string; entityType?: string }[] = [];

    // Low stock alerts
    const allLocations = await prisma.inventoryLocation.findMany({
      where: { branch: { companyId } },
      include: { item: true, branch: { select: { nameAr: true } } },
    });
    for (const loc of allLocations) {
      if (Number(loc.quantity) <= Number(loc.item.minStock) && Number(loc.item.minStock) > 0) {
        alerts.push({
          companyId, type: 'LOW_STOCK', severity: 'warning',
          title: `Low Stock: ${loc.item.nameEn}`, titleAr: `مخزون منخفض: ${loc.item.nameAr}`,
          message: `${loc.item.nameEn} at ${loc.branch.nameAr} is below minimum stock level`,
          messageAr: `${loc.item.nameAr} في ${loc.branch.nameAr} أقل من الحد الأدنى للمخزون`,
          entityId: loc.item.id, entityType: 'InventoryItem',
        });
      }
    }

    // Iqama expiry alerts
    const thirtyDays = new Date(); thirtyDays.setDate(thirtyDays.getDate() + 30);
    const expiringEmployees = await prisma.employee.findMany({
      where: { companyId, isActive: true, iqamaExpiryDate: { lte: thirtyDays } },
    });
    for (const emp of expiringEmployees) {
      alerts.push({
        companyId, type: 'IQAMA_EXPIRY', severity: 'error',
        title: `Iqama Expiring: ${emp.nameEn}`, titleAr: `انتهاء الإقامة: ${emp.nameAr}`,
        message: `${emp.nameEn}'s Iqama expires on ${emp.iqamaExpiryDate?.toLocaleDateString()}`,
        messageAr: `إقامة ${emp.nameAr} تنتهي في ${emp.iqamaExpiryDate?.toLocaleDateString('ar-SA')}`,
        entityId: emp.id, entityType: 'Employee',
      });
    }

    if (alerts.length > 0) {
      await prisma.alert.createMany({ data: alerts });
    }

    sendSuccess(res, { generated: alerts.length });
  } catch (err) { console.error(err); sendError(res, 'Failed to generate alerts', 500); }
};

import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import prisma from '../lib/prisma';

export const auditLog = (action: string, entity: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    res.json = function (body) {
      if (body?.success && req.user) {
        prisma.auditLog.create({
          data: {
            companyId: req.user.companyId,
            userId: req.user.userId,
            action,
            entity,
            entityId: body.data?.id || req.params.id,
            newValues: body.data,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          },
        }).catch(() => {});
      }
      return originalJson(body);
    };
    next();
  };
};

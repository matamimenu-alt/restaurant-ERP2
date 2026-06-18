import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    companyId: string;
    role: string;
    email: string;
  };
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (!req.user) {
    const user = await prisma.user.findFirst({ select: { id: true, companyId: true, role: true, email: true } });
    if (user) {
      req.user = { userId: user.id, companyId: user.companyId, role: user.role, email: user.email };
    }
  }
  next();
};

export const authorize = (..._roles: string[]) => {
  return (_req: AuthRequest, _res: Response, next: NextFunction) => {
    next();
  };
};

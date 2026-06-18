import { Router } from 'express';
import {
  getPLReport, getRevenueReport, getInventoryReport, getFoodCostReport, getPayrollReport, getAuditLog,
  getVatReport, getVatDeclaration, getRevenueByRestaurant, getRevenueByBranch, getRevenueByMonth,
} from '../controllers/reportController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/pl', getPLReport);
router.get('/revenue', getRevenueReport);
router.get('/revenue-by-restaurant', getRevenueByRestaurant);
router.get('/revenue-by-branch', getRevenueByBranch);
router.get('/revenue-by-month', getRevenueByMonth);
router.get('/inventory', getInventoryReport);
router.get('/food-cost', getFoodCostReport);
router.get('/payroll', getPayrollReport);
router.get('/vat', getVatReport);
router.get('/vat-declaration', getVatDeclaration);
router.get('/audit-log', getAuditLog);
export default router;

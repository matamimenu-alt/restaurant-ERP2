import { Router } from 'express';
import { getPLReport, getRevenueReport, getInventoryReport, getFoodCostReport, getPayrollReport, getAuditLog } from '../controllers/reportController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/pl', getPLReport);
router.get('/revenue', getRevenueReport);
router.get('/inventory', getInventoryReport);
router.get('/food-cost', getFoodCostReport);
router.get('/payroll', getPayrollReport);
router.get('/audit-log', getAuditLog);
export default router;

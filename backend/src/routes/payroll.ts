import { Router } from 'express';
import { getPayrollRuns, getPayrollRun, createPayrollRun, approvePayrollRun, generatePayrollFromEmployees, getSalaryAdvances, createSalaryAdvance } from '../controllers/payrollController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/runs', getPayrollRuns);
router.get('/runs/generate', generatePayrollFromEmployees);
router.get('/runs/:id', getPayrollRun);
router.post('/runs', createPayrollRun);
router.put('/runs/:id/approve', approvePayrollRun);
router.get('/advances', getSalaryAdvances);
router.post('/advances', createSalaryAdvance);
export default router;

import { Router } from 'express';
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getIqamaAlerts } from '../controllers/employeeController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getEmployees);
router.get('/iqama-alerts', getIqamaAlerts);
router.get('/:id', getEmployee);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
export default router;

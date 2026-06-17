import { Router } from 'express';
import { getRevenue, createRevenue, updateRevenue, deleteRevenue, getRevenueSummary } from '../controllers/revenueController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getRevenue);
router.get('/summary', getRevenueSummary);
router.post('/', createRevenue);
router.put('/:id', updateRevenue);
router.delete('/:id', deleteRevenue);
export default router;

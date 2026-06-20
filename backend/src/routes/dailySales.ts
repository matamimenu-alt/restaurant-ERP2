import { Router } from 'express';
import { getDailySalesRecords, getDailySalesSummary, createDailySalesRecord, updateDailySalesRecord, deleteDailySalesRecord } from '../controllers/dailySalesController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getDailySalesRecords);
router.get('/summary', getDailySalesSummary);
router.post('/', createDailySalesRecord);
router.put('/:id', updateDailySalesRecord);
router.delete('/:id', deleteDailySalesRecord);
export default router;

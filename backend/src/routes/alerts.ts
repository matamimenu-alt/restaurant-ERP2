import { Router } from 'express';
import { getAlerts, markAlertRead, markAllRead, generateAlerts } from '../controllers/alertController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getAlerts);
router.post('/generate', generateAlerts);
router.put('/mark-all-read', markAllRead);
router.put('/:id/read', markAlertRead);
export default router;

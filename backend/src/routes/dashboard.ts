import { Router } from 'express';
import { getFlashReport, getExecutiveAnalytics } from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/flash', getFlashReport);
router.get('/analytics', getExecutiveAnalytics);
export default router;

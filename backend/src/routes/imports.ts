import { Router } from 'express';
import multer from 'multer';
import { importRevenue, importExpenses, importEmployees, importPurchases, downloadTemplate } from '../controllers/importController';
import { authenticate } from '../middleware/auth';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const router = Router();
router.use(authenticate);
router.get('/templates/:type', downloadTemplate);
router.post('/revenue', upload.single('file'), importRevenue);
router.post('/expenses', upload.single('file'), importExpenses);
router.post('/employees', upload.single('file'), importEmployees);
router.post('/purchases', upload.single('file'), importPurchases);
export default router;

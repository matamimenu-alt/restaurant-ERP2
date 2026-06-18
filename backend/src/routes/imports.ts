import { Router } from 'express';
import multer from 'multer';
import {
  importRevenue, importExpenses, importEmployees, importPurchases,
  importRecipes, importInventoryItems, previewImport, getImportHistory,
  downloadTemplate,
} from '../controllers/importController';
import { authenticate } from '../middleware/auth';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });
const router = Router();
router.use(authenticate);

router.get('/templates/:type', downloadTemplate);
router.get('/history', getImportHistory);
router.post('/preview/:type', upload.single('file'), previewImport);
router.post('/revenue', upload.single('file'), importRevenue);
router.post('/expenses', upload.single('file'), importExpenses);
router.post('/employees', upload.single('file'), importEmployees);
router.post('/purchases', upload.single('file'), importPurchases);
router.post('/recipes', upload.single('file'), importRecipes);
router.post('/inventory', upload.single('file'), importInventoryItems);

export default router;

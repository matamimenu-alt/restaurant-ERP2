import { Router } from 'express';
import { getPurchaseInvoices, getPurchaseInvoice, createPurchaseInvoice, updatePurchaseInvoice, createPurchaseReturn, getPurchaseReturns } from '../controllers/purchaseController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/invoices', getPurchaseInvoices);
router.get('/invoices/:id', getPurchaseInvoice);
router.post('/invoices', createPurchaseInvoice);
router.put('/invoices/:id', updatePurchaseInvoice);
router.get('/returns', getPurchaseReturns);
router.post('/returns', createPurchaseReturn);
export default router;

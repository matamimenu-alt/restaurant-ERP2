import { Router } from 'express';
import { getPurchaseInvoices, getPurchaseInvoice, createPurchaseInvoice, updatePurchaseInvoice, deletePurchaseInvoice, createPurchaseReturn, getPurchaseReturns, getPurchaseLines } from '../controllers/purchaseController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/lines', getPurchaseLines);
router.get('/invoices', getPurchaseInvoices);
router.get('/invoices/:id', getPurchaseInvoice);
router.post('/invoices', createPurchaseInvoice);
router.put('/invoices/:id', updatePurchaseInvoice);
router.delete('/invoices/:id', deletePurchaseInvoice);
router.get('/returns', getPurchaseReturns);
router.post('/returns', createPurchaseReturn);
export default router;

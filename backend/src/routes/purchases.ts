import { Router } from 'express';
import { getPurchaseInvoices, getPurchaseInvoice, createPurchaseInvoice, updatePurchaseInvoice, deletePurchaseInvoice, bulkDeleteInvoices, transferInvoices, getPurchaseSummaryByRestaurant, createPurchaseReturn, getPurchaseReturns, getPurchaseLines } from '../controllers/purchaseController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/lines', getPurchaseLines);
router.get('/summary', getPurchaseSummaryByRestaurant);
router.get('/invoices', getPurchaseInvoices);
router.get('/invoices/:id', getPurchaseInvoice);
router.post('/invoices', createPurchaseInvoice);
router.put('/invoices/:id', updatePurchaseInvoice);
router.delete('/invoices/:id', deletePurchaseInvoice);
router.post('/invoices/bulk-delete', bulkDeleteInvoices);
router.post('/invoices/bulk-transfer', transferInvoices);
router.get('/returns', getPurchaseReturns);
router.post('/returns', createPurchaseReturn);
export default router;

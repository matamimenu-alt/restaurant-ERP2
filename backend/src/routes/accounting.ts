import { Router } from 'express';
import { getAccounts, createAccount, updateAccount, getJournalEntries, createJournalEntry, getBankAccounts, createBankAccount, updateBankAccount, getTrialBalance } from '../controllers/accountingController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/accounts', getAccounts);
router.post('/accounts', createAccount);
router.put('/accounts/:id', updateAccount);
router.get('/journal-entries', getJournalEntries);
router.post('/journal-entries', createJournalEntry);
router.get('/bank-accounts', getBankAccounts);
router.post('/bank-accounts', createBankAccount);
router.put('/bank-accounts/:id', updateBankAccount);
router.get('/trial-balance', getTrialBalance);
export default router;

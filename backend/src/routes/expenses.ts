import { Router } from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense, getExpenseCategories, createExpenseCategory, getExpenseSummary } from '../controllers/expenseController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getExpenses);
router.get('/summary', getExpenseSummary);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/categories', getExpenseCategories);
router.post('/categories', createExpenseCategory);
export default router;

import { Router } from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense, getExpenseCategories, createExpenseCategory, updateExpenseCategory, deleteExpenseCategory, getExpenseSummary } from '../controllers/expenseController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/summary', getExpenseSummary);
router.get('/categories', getExpenseCategories);
router.post('/categories', createExpenseCategory);
router.put('/categories/:id', updateExpenseCategory);
router.delete('/categories/:id', deleteExpenseCategory);
router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
export default router;

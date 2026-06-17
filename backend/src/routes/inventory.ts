import { Router } from 'express';
import { getItems, getItem, createItem, updateItem, deleteItem, getCategories, createStockMovement, getStockMovements, getLowStockItems, createPhysicalCount, completePhysicalCount } from '../controllers/inventoryController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/items', getItems);
router.get('/items/low-stock', getLowStockItems);
router.get('/items/:id', getItem);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.get('/categories', getCategories);
router.get('/movements', getStockMovements);
router.post('/movements', createStockMovement);
router.post('/physical-counts', createPhysicalCount);
router.put('/physical-counts/:id/complete', completePhysicalCount);
export default router;

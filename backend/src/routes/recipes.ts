import { Router } from 'express';
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, calculatePricing } from '../controllers/recipeController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);
router.post('/calculate-pricing', calculatePricing);
export default router;

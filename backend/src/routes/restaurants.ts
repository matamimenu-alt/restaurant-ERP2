import { Router } from 'express';
import { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);
export default router;

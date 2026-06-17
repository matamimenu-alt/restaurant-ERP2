import { Router } from 'express';
import { login, refreshToken, logout, me, changePassword, registerCompany } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.post('/login', login);
router.post('/register', registerCompany);
router.post('/refresh', refreshToken);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, me);
router.put('/change-password', authenticate, changePassword);
export default router;

import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();
router.post('/register', register);
router.post('/login', login);

export default router;

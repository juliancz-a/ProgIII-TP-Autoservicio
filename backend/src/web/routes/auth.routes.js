import { Router } from 'express';
import authMiddleware from '../../api/middlewares/auth.middleware.js';
import loginController from '../controllers/login.controller.js'

const router = Router();

// Vista del login
router.get('/login', loginController.renderLogin);

// Manejo del login
router.post('/login', authMiddleware.validatePassword, loginController.authLogin);

export default router;

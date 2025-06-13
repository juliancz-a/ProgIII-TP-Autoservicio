import { Router } from 'express';
import loginController from '../controllers/login.controller.js';

const router = Router();

// Vista del login
router.get('/login', loginController.renderLogin);

// Manejo del login
router.post('/login', loginController.validateLoginForm);

export default router;

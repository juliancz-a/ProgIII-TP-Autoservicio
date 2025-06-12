import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';
import loginController from '../controllers/login.controller.js';

const router = Router();

router.get('/', panelController.renderDashboard);

router.get('/login', loginController.renderLogin);
router.post('/login', loginController.validateLoginForm)

export default router;
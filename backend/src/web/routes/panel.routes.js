import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';

const router = Router();

router.get('/', panelController.renderDashboard);

router.get('/login', panelController.renderLogin);

router.post('/login', panelController.validateLoginForm)

export default router;
import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';

const router = Router();

router.get('/', panelController.renderDashboard);

router.get('/edit/:id', panelController.renderProductForm);

export default router;
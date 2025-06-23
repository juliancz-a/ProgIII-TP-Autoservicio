import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';

const router = Router();

router.get('/', panelController.renderDashboard);

router.get('/edit/:id', panelController.renderProductForm);

router.get('/create', panelController.renderNewProductForm);

router.get('/sales', panelController.renderSales)

router.post('/create', panelController.validateNewProductForm);

router.post('/edit/:id', panelController.validateProductForm);

export default router;
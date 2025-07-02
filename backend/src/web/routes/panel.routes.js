import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';

const router = Router();

router.get('/', panelController.renderDashboard);

router.get('/products', panelController.renderProducts);
router.get('/sales', panelController.renderSales)
router.get('/users', panelController.renderUsers)


router.get('/edit/:id', panelController.renderProductForm);
router.get('/create', panelController.renderNewProductForm);



export default router;
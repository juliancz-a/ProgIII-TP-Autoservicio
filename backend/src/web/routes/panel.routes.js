import {Router} from 'express';
import panelController from '../controllers/panel.controller.js';

// Enviar multer sin archivos para parsear multipart/form-adta
import upload from "../../api/middlewares/multer.middleware.js";

const router = Router();

router.get('/', panelController.renderDashboard);

router.get('/edit/:id', panelController.renderProductForm);

router.get('/create', panelController.renderNewProductForm);

router.get('/sales', panelController.renderSales)

router.post('/create',upload.none(),panelController.validateNewProductForm);

router.post('/edit/:id',upload.none(), panelController.validateProductForm);

export default router;
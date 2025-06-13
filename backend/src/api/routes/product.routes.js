import {Router} from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.findAllProducts);

router.post('/', productController.create)

export default router;
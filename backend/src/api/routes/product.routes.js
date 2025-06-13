import {Router} from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.patch('/toggle/:id', productController.toggleProductStatus)

export default router;
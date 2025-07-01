import { Router } from 'express';
import { productMiddleware } from '../../api/middlewares/validator.middleware.js';
import productController from '../controllers/product.controller.js';
import upload from "../../api/middlewares/multer.middleware.js";

const router = Router();

router.get('/', productController.getAllProducts);

router.get('/enabled', productController.getAllProductsEnabled);

router.post('/cart', productController.getAllProductsOnCart);

router.get('/:id', productController.getProductById);

router.post('/', upload.single('image'), productMiddleware, productController.createProduct);

router.put('/:id', upload.single('image'), productMiddleware, productController.updateProductById);

router.patch('/:id', productController.toggleEnabledById);

router.delete('/:id', productController.deleteProductById);

export default router;
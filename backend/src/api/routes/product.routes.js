import { Router } from 'express';
import multer from "multer";
import productController from '../controllers/product.controller.js';

const router = Router();
const upload = multer();

router.get('/', productController.getAllProducts);

router.get('/enabled', productController.getAllProductsEnabled);

router.post('/cart', productController.getAllProductsOnCart);

router.get('/:id', productController.getProductById);

router.post('/', upload.single('image'), productController.createProduct);

router.put('/:id', productController.updateProductById);

router.patch('/:id', productController.toggleEnabledById);

router.delete('/:id', productController.deleteProductById);

export default router;
import { Router } from 'express';
import multer from "multer";
import productController from '../controllers/product.controller.js';
import { productMiddleware } from '../../api/middlewares/validator.middleware.js';
// Enviar multer sin archivos para parsear multipart/form-adta
import upload from "../../api/middlewares/multer.middleware.js";

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
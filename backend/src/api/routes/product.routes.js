import {Router} from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findProductById);

router.post('/', productController.createProduct)

router.put('/:id', productController.updateProductById)

router.patch('/:id', productController.toggleEnabledById)

router.delete('/:id', productController.deleteProductById)

export default router;
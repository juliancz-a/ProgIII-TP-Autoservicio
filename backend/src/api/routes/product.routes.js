import {Router} from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);
router.post('/cart', productController.getAllProductsOnCart);

router.put('/:id', productController.updateProductById);

router.patch('/:id', productController.toggleEnabledById);

router.delete('/:id', productController.deleteProductById);

export default router;
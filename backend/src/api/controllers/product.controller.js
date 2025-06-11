import productService from '../services/product.service.js'

const getAllProducts = (req, res) => {
    const products = productService.getAll();

    res.status(200).json(products);
}

export default {getAllProducts}
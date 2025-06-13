import productService from '../services/product.service.js'

const getAllProducts = (req, res) => {
    const products = productService.getAll();

    res.status(200).json(products);
}

const toggleProductStatus = (req, res) => {
    const {id} = req.params;

    const product = productService.toggleStatus(Number(id));

    res.status(200).json(product);
}

export default {getAllProducts, toggleProductStatus}
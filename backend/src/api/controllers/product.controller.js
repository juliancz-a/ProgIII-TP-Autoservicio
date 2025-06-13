import productService from '../services/product.service.js'

const productController = {
    async findAllProducts(req, res) {

        try {
            const products = await productService.findAll();
             res.status(200).json(products);
        } catch (error) {

            
            
        }
    },

    async create(req, res) {

        try {
            productService.create(req.body)
            res.status(201).send('Created')
        } catch (error) {
            res.status(500).send('Server failure')
        }

    } 

}

export default productController
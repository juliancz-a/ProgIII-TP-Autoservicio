import productService from '../services/product.service.js'

class ProductController {
    getAllProducts = async (req, res)  => {
        try {
            const products = await productService.getAll();

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json('Server failure!')
            console.log(error);
            
        }
    }

    getProductById = async (req, res)  => {
        try {
            let id = req.params.id;
            const product = await productService.getById(id);

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json('Server failure')
        }

    }

    createProduct = async (req, res)  => {
        try {
            const product = req.body;
            productService.create(product)

            res.status(201).json('Created')
        } catch (error) {
            res.status(500).json('Server failure')
        }
    }


    updateProductById = async (req, res)  => {
        try {
            const product = req.body;
            const id = req.params.id;
            productService.updateById(id, product)

            res.status(201).json('Updated')
            
        } catch (error) {
            res.status(500).json('Server failure')
        }
    }

    toggleEnabledById = async (req, res)  => {
        try {
            const enabled = req.body.enabled;
            const id = req.params.id;
            
            productService.patchEnabledById(id, enabled)

            res.status(200).json('Patched')
        } catch (error) {
            res.status(500).json('Server failure')
        }
    }


    deleteProductById = async (req, res)  => {
        try {
            const id = req.params.id;
            productService.deleteById(id)
            res.status(201).json('Deleted')
            
        } catch (error) {
            res.status(500).json('Server failure')
        }

    }

}

export default new ProductController();
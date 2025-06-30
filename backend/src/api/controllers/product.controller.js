import productService from '../services/product.service.js'

class ProductController {
    getAllProducts = async (req, res)  => {
        try {
            const page = parseInt(req.query.page) || 1;     // página actual
            const limit = parseInt(req.query.limit) || 12;  // ítems por página
            const offset = (page - 1) * limit; //skips por pagina (primera pagina 0 skips)

            const { count, rows } = await productService.getAll(limit, offset);

            res.status(200).json({
                products: rows,
                pagination: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                }
            });
        } catch (error) {
            res.status(500).json('Server failure!')
            console.log(error);
        }
    }

    getAllProductsEnabled = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;     // página actual
            const limit = parseInt(req.query.limit) || 12;  // ítems por página
            const category = req.query.category;

            const offset = (page - 1) * limit;

            const { count, rows } = await productService.getAllAndIsEnabled(limit, offset, category);
            
            const totalPages = Math.ceil(count / limit);

            res.status(200).json({
                products: rows,
                pagination: {
                    totalItems: count,
                    currentPage: page,
                    totalPages
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
            console.log(error);
        }
    }

    getAllProductsOnCart = async (req, res)  => {
        try {
            const ids = req.body.ids  
            const products = await productService.getAllByIds(ids);

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });;
            console.log(error);
        }
    }

    getProductById = async (req, res)  => {
        try {
            let id = req.params.id;
            const product = await productService.getById(id);

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }

    }

    createProduct = async (req, res)  => {
        try {
            const {title, description, category, price, image_id} = req.body;
            console.log("body de la request");
            
            console.log(req.body);
            
            productService.create({title, description, category, price, image_id})

            res.status(201).json('Product was created successfully');
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    }


    updateProductById = async (req, res)  => {
        try {
            const product = req.body;
            const id = req.params.id;
            productService.updateById(id, product)

            res.status(201).json('Updated')
            
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    }

    toggleEnabledById = async (req, res)  => {
        try {
            const enabled = req.body.enabled;
            const id = req.params.id;
            
            productService.patchEnabledById(id, enabled)

            res.status(200).json('Patched')
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    }


    deleteProductById = async (req, res)  => {
        try {
            const id = req.params.id;
            productService.deleteById(id)
            res.status(201).json('Deleted')
            
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }

    }

}

export default new ProductController();
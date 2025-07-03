import productValidator from "../../web/public/js/productValidator.js";

export function productMiddleware (req, res, next) {

    try {
        console.log(req.body);
        
        productValidator.validateProduct(req.body);
    } catch (error) {
        return res.status(400).json({ message: 'Datos inválidos', error: error});
    }
    next();
}
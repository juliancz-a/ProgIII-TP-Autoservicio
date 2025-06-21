import saleDao from "../dao/sale.dao.js";

class SaleController {

    async getAll(req, res) {
        try {
            const sales = await saleDao.findAll()
            res.status(200).json(sales);
        } catch (error) {
            res.status(500).json('Server failure');
        }
    }
}

export default new SaleController();
import saleDao from "../dao/sale.dao.js";
import formatUtils from "../utils/formatUtils.js";

class SaleController {

    async getAllSales(req, res) {
        try {
            const sales = await saleDao.findAll();

            const salesFormatted = sales.map(sale => (
                {
                    ...sale,
                    creationDate: formatUtils.formatDate(sale.createdAt)
                }
            ))

            res.status(200).json(salesFormatted);
        } catch (error) {
            res.status(500).json('Server failure');
        }
    }

    async getSaleById(req, res) {
        try {
            const {id} = req.params;
            const sale = await saleDao.findById(id);
            res.status(200).json(sale);
        } catch (error) {
            res.status(500).json('Server failure', error);
        }
    }

    async createSale(req, res) {
        try {
            const sale = await saleDao.create(req.body)
            res.status(201).json(sale);
        } catch (error) {
            res.status(500).json('Server failure', error);
            console.log(error);
            
        }
    }
}

export default new SaleController();
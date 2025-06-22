import saleDao from "../dao/sale.dao.js";

class SaleController {

    async getAllSales(req, res) {
        try {
            const sales = await saleDao.findAll()
            res.status(200).json(sales);
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
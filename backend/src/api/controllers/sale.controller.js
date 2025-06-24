import saleService from "../services/sale.service.js";
import formatUtils from "../utils/formatUtils.js"

class SaleController {

    getAllSales = async (req, res) => {
        try {
            const sales = await saleService.getAll();

            const salesFormatted = sales.map(({ dataValues }) => ({
                ...dataValues,
                formattedDate: formatUtils.formatDate(dataValues.createdAt),
                formattedPrice: formatUtils.formatPrice(dataValues.total)[0]
            }));

            res.status(200).json(salesFormatted);
        } catch (error) {
            res.status(500).json('Server failure');
            console.log(error);
        }
    }

    async getSaleById(req, res) {
        try {
            const {id} = req.params;
            const sale = await saleService.getById(id);
            res.status(200).json(sale);
        } catch (error) {
            res.status(500).json('Server failure', error);
        }
    }

    async createSale(req, res) {
        try {
            const sale = await saleService.create(req.body)
            res.status(201).json(sale);
        } catch (error) {
            res.status(500).json('Server failure', error);
            console.log(error);
            
        }
    }
}

export default new SaleController();
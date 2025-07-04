import saleService from "../services/sale.service.js";
import formatUtils from "../utils/formatUtils.js"

class SaleController {

    getAllSales = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;     // página actual
            const limit = parseInt(req.query.limit) || 10;  // ítems por página
            const offset = (page - 1) * limit;
            const target = req.query.target;
            const order = req.query.order;
            
            const { count, rows } =  await saleService.getAll(limit, offset, target, order);

            const salesFormatted = rows.map(({ dataValues }) => ({
                ...dataValues,
                formattedDate: formatUtils.formatDate(dataValues.createdAt),
                formattedPrice: formatUtils.formatPrice(dataValues.total)[0]
            }));

            res.status(200).json({
                sales : salesFormatted,
                pagination : {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                currentPage: page,
                }      
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
            console.log(error);
        }
    }

    async getSaleById(req, res) {
        try {
            const {id} = req.params;
            const sale = await saleService.getById(id);
            res.status(200).json(sale);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    }

    async createSale(req, res) {
        try {
            const sale = await saleService.create(req.body)
            res.status(201).json(sale);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", err: error.message });
        }
    }
}

export default new SaleController();
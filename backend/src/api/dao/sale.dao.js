import {Sale, SaleDetail} from '../models/index.js';
import sequelize from '../../config/db.js';
import { Op } from 'sequelize';

class SaleDao {
    async findAll(limit = 10, offset = 0, target = null, order = null) {
        let where = {}

        if (target) {
            where.client_name = { [Op.like]: `%${target.trim()}%` };  // busca coincidencias parciales
        }

        return await Sale.findAndCountAll({
            limit,
            offset,
            order: order, 
            distinct: true,
            where
        });
    }

    async findById(id) {
        return await Sale.findByPk(id, { include: [{model : SaleDetail, as : 'sale_details'}]});
    }
    
    async create(saleBody) {
        return await sequelize.transaction(async (t) => {
            const {client_name, date, total, products} = saleBody

            const sale = await Sale.create({client_name, date, total}, {transaction : t})
            
            const details = products.map((detail) => {
                return {
                    sale_id : sale.id,
                    product_id : detail.id,
                    quantity : detail.quantity,
                    product_name : detail.title,
                    unit_price : detail.unit_price
                }
            })            

            await SaleDetail.bulkCreate(details, {transaction : t})

            return sale;
        })
    }
    
    async deleteById(id) {
        return await Sale.destroy({ where: { id } });
    }
}

export default new SaleDao();

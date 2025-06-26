import {Sale, SaleDetail} from '../models/index.js';
import sequelize from '../../config/db.js';

// FRONTEND BODY 
// const body = {
//     client_name : 'Julian',
//     total : 2500,
//     products : [
//         {
//             id : 1,
//             title : "Joystick",
//             unit_price : 1250,
//             quantity : 2
//         }
//     ]
// }

class SaleDao {
    async findAll(limit = 10, offset = 0) {
        return await Sale.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'ASC']], 
            include: [{model : SaleDetail, as : 'sale_details'}],
            distinct: true
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

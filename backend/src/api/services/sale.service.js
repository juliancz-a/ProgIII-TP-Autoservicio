import saleDao from "../dao/sale.dao.js";

class SaleService {

    async getAll(limit = 10, offset = 0, target = null, order = null) {

        if (order){ 
            const match = order.match(/(client_name|total)(ASC|DESC)/);
            if (match) {
                const field = match[1]; // "name" o "total"
                const direction = match[2]; // "ASC" o "DESC"
                order = [[field, direction]];
            }

        } else {
            order = [["createdAt", "ASC"]] //default order
        }

        
        return await saleDao.findAll(limit, offset, target, order);
    }

    async getById(id) {
        return await saleDao.findById(id);
    }

    async create(body) {
        return await saleDao.create(body);
    }
}

export default new SaleService();
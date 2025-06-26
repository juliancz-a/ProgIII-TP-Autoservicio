import saleDao from "../dao/sale.dao.js";

class SaleService {

    async getAll(limit = 10, offset = 0) { 
        return await saleDao.findAll(limit, offset);
    }

    async getById(id) {
        return await saleDao.findById(id);
    }

    async create(body) {
        return await saleDao.create(body);
    }
}

export default new SaleService();
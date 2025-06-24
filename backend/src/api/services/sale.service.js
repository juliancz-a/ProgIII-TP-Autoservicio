import saleDao from "../dao/sale.dao.js";

class SaleService {

    async getAll() { 
        return await saleDao.findAll();
    }

    async getById(id) {
        return await saleDao.findById(id);
    }

    async create(body) {
        return await saleDao.create(body);
    }
}

export default new SaleService();
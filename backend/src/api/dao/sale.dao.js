import {Sale} from '../models/index.js';

class SaleDao {
    async findAll() {
        return await Sale.findAll({ include: 'sale_details' });
    }

    async findById(id) {
      return await Sale.findByPk(id, { include: 'sale_details' });
    }
    
    async create(saleData) {
        return await Sale.create(saleData);
    }
    
    
  async deleteById(id) {
    return await Sale.destroy({ where: { id } });
  }
}

export default new SaleDao();

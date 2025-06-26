import productDao from "../dao/product.dao.js"
import productValidator from "../validators/product.validator.js";

class ProductService {

    async getAll(limit = 10, offset = 0) {
      return await productDao.findAll(limit, offset);
    }

    async getAllAndIsEnabled(limit = 10, offset = 0, category = null) {
      return await productDao.findAllAndIsEnabled(limit, offset, category);
    }

    async getAllByIds(ids) {
      return await productDao.findAllByIds(ids);
    }

    async getById(id) {
      const productDb = await productDao.findById(id);

      return productDb;
    }

    async create(body) {
      productValidator.validateProduct(body);
      return await productDao.create(body)
    }

    async updateById(id, body) {
      productValidator.validateProduct(body);
      await productDao.updateById(id, body)
    }

    async patchEnabledById(id, enabled) {
      await productDao.toggleEnabledById(id, enabled)
    }

    async deleteById(id) {
      productDao.deleteById(id);
    }
  }

export default new ProductService();
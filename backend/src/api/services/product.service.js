import productDao from "../dao/product.dao.js"
import productValidator from "../validators/product.validator.js";

class ProductService {

    async getAll() {
      return await productDao.findAll();
    }

    async getAllAndIsEnabled() {
      return await productDao.findAllAndIsEnabled();
    }

    async getAllByIds(ids) {
      return await productDao.findAllByIds(ids);
    }

    async getById(id) {
      const productDb = await productDao.findById(id);
      if (!productDb) throw new Error(`Producto con id: ${id} no encontrado`)

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
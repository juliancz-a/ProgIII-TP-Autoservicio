import productDao from "../dao/product.dao.js"
import { Product } from "../models/product.model.js"

class productService {

    async findAll() {
      const productsDb = await productDao.findAll();

      return productsDb.map((product) => {
        return new Product(product.id, product.title, product.description, product.category, product.price, product.img, product.enabled)
      });
    }

    async findById(id) {
      const productDb = await productDao.findById(id);

      if (!productDb || productDb.length === 0) {
        return;
      }
  
      return new Product(
        productDb.id,
        productDb.title,
        productDb.description,
        productDb.category,
        productDb.price,
        productDb.img,
        Boolean(productDb.enabled)
      );
    }

    async create(body) {
      const product = new Product(null, body.title, body.description, body.category, body.price, body.img, body.enabled);

      productDao.create(product)
    }

    async updateById(id, product) {
      productDao.updateById(id, product)
    }

    async toggleEnabledById(id, enabled) {
      productDao.toggleEnabledById(id, enabled)
    }

    async deleteById(id) {
      productDao.deleteById(id);
    }

  }

export default new productService();
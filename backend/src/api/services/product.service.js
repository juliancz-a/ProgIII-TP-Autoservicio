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
      const productDb = await productDao.findById(id)

      return new Product(productDb[0]);
    }

    async create(body) {
      const product = new Product(null, body.title, body.description, body.category, body.price, body.img, body.enabled);

      console.log(product);
      
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
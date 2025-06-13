import productDao from "../dao/product.dao.js"
import { Product } from "../models/product.model.js"

const productService = {

    async findAll() {
      const productsDb = await productDao.findAll();

      return productsDb.map((product) => {
        return new Product(product.id, product.title, product.description, product.category, product.price, product.img, product.status)
      });
    },

    async findById() {
      console.log();
      
    },

    async create(body) {
      const product = new Product(2, body.title, body.description, body.category, body.price, body.img, body.status);
      productDao.create(product)
      
    }


  }


export default productService
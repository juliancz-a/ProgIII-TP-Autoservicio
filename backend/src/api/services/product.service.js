import productDao from "../dao/product.dao.js";
import imageDao from "../dao/image.dao.js";
import sequelize from "../../config/db.js";
import streamifier from 'streamifier';
import cloudinary from '../../config/cloudinary.js';

class ProductService {

    async getAll(limit = 10, offset = 0) {
      return await productDao.findAll(limit, offset);
    }

    async getAllAndIsEnabled(limit = 10, offset = 0, category = null, target = null) {
      return await productDao.findAllAndIsEnabled(limit, offset, category, target);
    }

    async getAllByIds(ids) {
      return await productDao.findAllByIds(ids);
    }

    async getById(id) {
      const productDb = await productDao.findById(id);

      return productDb;
    }

    async create(body) {
      const { title, description, category, price, enabled, imageFile } = body;

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
          folder: 'images',
          resource_type: 'image'
        }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });

        streamifier.createReadStream(imageFile.buffer).pipe(stream);
      });

      return await sequelize.transaction(async (t) => {
          const product = await productDao.create({
            title,
            description,
            category,
            price: parseFloat(price),
            enabled: enabled === 'true'
          }, { transaction: t });

          await imageDao.upload({
            name: imageFile.originalname,
            url: uploadResult.secure_url,
            product_id: product.id
          }, { transaction: t });

          return product;
        }
      );
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
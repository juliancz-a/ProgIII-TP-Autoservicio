import productDao from "../dao/product.dao.js";
import imageDao from "../dao/image.dao.js";
import sequelize from "../../config/db.js";
import streamifier from 'streamifier';
import cloudinary from '../../config/cloudinary.js';
import { Op } from "sequelize";

class ProductService {

    async getAll(limit = 10, offset = 0, order = null, target = null, filters = {}) {

      const where = {};
      const {min, max} = filters.priceRange

      if (filters.category) {
        where.category = filters.category;
      }

      if (min || max) {
        where.price = {};
        if (min) {
          where.price[Op.gte] = min;
        }
        if (max) {
          where.price[Op.lte] = max;
        }
      }

      if (filters.enabled) {
        where.enabled = filters.enabled === 'true';
      }
      
      if(order) {
        if(order === 'DESC' || order === 'ASC') {
          order = ['price', order] // Price order
        } else {
          order = ['enabled', order === 'active' ? 'DESC' : 'ASC'] // Status order
        }
      } else {
        order = ['createdAt', 'ASC'] // default order
      }
      
      return await productDao.findAll(limit, offset, order, target, where);
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

      const uploadResult = await this.uploadToCloud(imageFile);
      
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
      const { title, description, category, price, enabled, imageId, existingImageFile, imageFile} = body;
      let imageData = JSON.parse(existingImageFile)

      let url = imageData.url // existing image cloudinary url
      let originalname = imageData.name  //existing image cloudinary url

      if (imageFile) {
        const uploadResult = await this.uploadToCloud(imageFile) 

        url = uploadResult.secure_url //cloudinary url
        originalname = imageFile.originalname // new image original name
      }

      return await sequelize.transaction(async (t) => {
        await productDao.updateById(id, {
          title,
          description,
          category,
          price: parseFloat(price),
          enabled: enabled === 'true'
        }, { transaction: t });

        await imageDao.update(parseInt(imageId), {
          name: originalname,
          url: url,
          product_id: id
        }, { transaction: t });

        const updatedProduct = await productDao.findById(id, { transaction: t });
        return updatedProduct;
    });
  }

    async patchEnabledById(id, enabled) {
      await productDao.toggleEnabledById(id, enabled)
    }

    async deleteById(id) {
      productDao.deleteById(id);
    }
    
    async uploadToCloud(file) {
        return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ // stream de subida
          folder: 'images',
          resource_type: 'image'
        }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
      }
  }


export default new ProductService();
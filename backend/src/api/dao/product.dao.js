import {Product, Image} from "../models/index.js";
import { Op } from 'sequelize';

class ProductDao {

    async findAll(limit = 10, offset = 0, order = ['createdAt', 'ASC'], target = null, where) {
        
        if (target) {
            where.title = { [Op.like]: `%${target.trim()}%` };  // busca coincidencias parciales
        }
        
        console.log(order);
        
        return await Product.findAndCountAll({
            limit,
            offset,
            order: [order],
            include: [{model : Image, as : 'images'}],
            where
        });
    }

    async findAllAndIsEnabled(limit = 10, offset = 0, category = null, target = null) {
        const where = { enabled: true };
        
        if (category) {
            where.category = category;
        }

        if (target) {
            where.title = { [Op.like]: `%${target.trim()}%` };  // busca coincidencias parciales
        }

        return await Product.findAndCountAll({
            limit,
            offset,
            order: [
                ['createdAt', 'ASC']
            ],
            include: [{model : Image, as : 'images'}],
            where
        });
    }

    async findAllByIds(ids) {
        return await Product.findAll({where : {id : ids}, include: [{model : Image, as : 'images'}]})
    }

    async findById(id) {
        return await Product.findByPk(id, 
            {include: [
                {model : Image, as : 'images'}
            ]}
        );
    }

    async create(product, options = {}) {
        return await Product.create(product, options);
    }

    async updateById(id, product) {
        return await Product.update({ ...product }, {
            where : {id : id}
        })
    }

    async toggleEnabledById(id, enabled) {         
        return await Product.update({ enabled }, {
            where : {id : id}
        })
    }

    async deleteById(id) {
        return await Product.destroy({where : {id : id}})
    }
}

export default new ProductDao();
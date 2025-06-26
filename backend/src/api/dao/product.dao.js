import {Product} from "../models/index.js";

class ProductDao {

    async findAll(limit = 10, offset = 0) {
        return await Product.findAndCountAll({
            limit,
            offset,
            order: [
                ['createdAt', 'ASC']
            ]
        });
    }

    async findAllAndIsEnabled(limit = 10, offset = 0, category = null) {
        const where = { enabled: true };
        
        if (category) {
            where.category = category;
        }

        return await Product.findAndCountAll({
            limit,
            offset,
            order: [
                ['createdAt', 'ASC']
            ],
            where
        });
    }

    async findAllByIds(ids) {
        return await Product.findAll({where : {id : ids}})
    }

    async findById(id) {
        return await Product.findByPk(id);
    }

    async create(product) {
        return await Product.create(product);
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
import {Product, Image} from "../models/index.js";

class ProductDao {

    async findAll(limit = 10, offset = 0) {
        return await Product.findAndCountAll({
            limit,
            offset,
            order: [
                ['createdAt', 'ASC']
            ],
            include: [{model : Image, as : 'images'}]
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
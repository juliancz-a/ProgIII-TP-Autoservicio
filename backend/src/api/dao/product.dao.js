import {Product} from "../models/index.js";

class ProductDao {

    async findAll() {
        return await Product.findAll()
    }

    async findAllAndIsEnabled() {
        return await Product.findAll({where : {enabled : 1}})
    }

    async findById(id) {
        return await Product.findByPk(id);
    }

    async create(product) {
        return await Product.create(product);
    }

    async updateById(id, product) {
        return await Product.update(product, {
            where : {id : id}
        })
    }

    async toggleEnabledById(id, enabled) {         
        return await Product.update(enabled, {
            where : {id : id}
        })
    }

    async deleteById(id) {
        return await Product.destroy({where : {id : id}})
    }
}

export default new ProductDao();
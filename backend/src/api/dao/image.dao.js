import { Image } from "../models/index.js";

class ImageDao {
    async findAll() {
        return await Image.findAll();
    }

    async findById(id) {
        return await Image.findByPk(id)
    }

    async upload(image, options = {}) {
        return await Image.create(image, options);
    }

    async bulkCreate(images, options = {}) {
        return await Image.bulkCreate(images, options);
    }

    async update(image) {
        return await Image.update(image);
    }

    async deleteById(id) {
        await Image.destroy({where : {id : id}})
    }
}

export default new ImageDao();
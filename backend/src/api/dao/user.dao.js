import { User } from "../models/index.js";

class UserDao {
    async findAll(limit = 10, offset = 0) {
        return await User.findAndCountAll({
            limit,
            offset
    })
    }

    async findById(id) {
        return await User.findByPk(id)
    }

    async findByUsername(username) {
        return await User.findOne({where : {username : username}})
    }

    async create(user) {
        return await User.create(user);
    }

    async update(user) {
        return await User.update(user);
    }

    async deleteById(id) {
        await User.destroy({where : {id : id}})
    }
}

export default new UserDao();
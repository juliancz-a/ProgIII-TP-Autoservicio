import { User } from "../models/index.js";

class UserDao {
    async findAll() {
        return await User.findAll();
    }

    async findById(id) {
        return await User.findByPk(id)
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
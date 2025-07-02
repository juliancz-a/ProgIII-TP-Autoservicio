import userDao from "../dao/user.dao.js";

class UserService {

    async getAll(limit = 10, offset = 0) {
      return await userDao.findAll(limit, offset);
    }

    async getByUsername(username) {
        return await userDao.findByUsername(username)
    }
}

export default new UserService();

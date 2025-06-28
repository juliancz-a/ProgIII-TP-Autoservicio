import userDao from "../dao/user.dao.js";

class UserController {
    getAllUsers = async (req, res) => {
        try {
            const users = await userDao.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: "Internal server error", err: error.message });
        }
    };

    getUserById = async (req, res) => {
        try {
            const {id} = req.params
            const userFound = await userDao.findById(id)

            if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

            res.status(200).json(userFound);
        } catch (error) {
            res.status(500).json({message: "Internal server error", err: error.message });
        }
    };

    createUser = async (req, res) => {
        try {
            const {username, password} = req.body

            const user = await userDao.create({username, password})
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: "Internal server error", err: error.message });
        }
    };
}

export default new UserController();
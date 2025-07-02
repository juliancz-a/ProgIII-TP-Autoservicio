import userDao from "../dao/user.dao.js";

class UserController {
    getAllUsers = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;     // página actual
            const limit = parseInt(req.query.limit) || 10;  // users por página
            const offset = (page - 1) * limit;

            const { count, rows } =  await userDao.findAll(limit, offset);

            const usersFormatted = rows.map(({ dataValues }) => ({
                ...dataValues,
                formattedDate: formatUtils.formatDate(dataValues.createdAt),
            }));

            res.status(200).json({
                users:  usersFormatted,
                pagination: {
                    totalItems: count,
                    currentPage: page,
                    totalPages
                }});
                
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
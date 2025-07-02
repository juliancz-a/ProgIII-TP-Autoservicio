import bcrypt from "bcrypt";
import userDao from "../dao/user.dao.js";

const saltRounds = 10;

const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "La contraseña es obligatoria" })
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        req.body.password = hashedPassword;
        next();
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const validatePassword = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
    
    const user = await userDao.findByUsername(username)
    
    if (!user) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" })
    };

    req.user = user;
    next();
}

export default {
    hashPassword,
    validatePassword
}
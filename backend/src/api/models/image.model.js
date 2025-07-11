import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";

const Image = sequelize.define("image", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    product_id: { // 👈 FK que apunta al producto
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {tableName : 'images'});

export default Image;

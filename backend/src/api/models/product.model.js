import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('product', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING(256),
        allowNull : false
    },
    description : {
        type : DataTypes.STRING(256)
    },
    category : {
        type : DataTypes.STRING(32),
        allowNull : false
    },
    price : {
        type : DataTypes.DOUBLE(10,2),
        allowNull : false,
    },
    enabled : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : 1
    }
}, {tableName : 'products'})

export default Product
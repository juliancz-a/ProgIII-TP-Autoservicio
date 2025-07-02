import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";
import Sale from "./sale.model.js";

const SaleDetail = sequelize.define('sale_details', {
    sale_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        foreignKey : {
            model: 'sales',
            key : 'id'
        },
        allowNull : false
    },
    product_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        foreignKey : {
            model: 'products',
            key : 'id'
        },
        allowNull : false
    },
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    product_name : {
        type : DataTypes.STRING(256),
        allowNull : false
    },
    unit_price : {
        type : DataTypes.DOUBLE(10,2),
        allowNull : false
    }
}, {tableName : 'sale_details', timestamps : false})

export default SaleDetail
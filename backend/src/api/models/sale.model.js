import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";
import SaleDetail from "./saleDetail.model.js";

const Sale = sequelize.define('sale', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    client_name : {
        type : DataTypes.STRING(256),
        allowNull : false
    },
    total : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
}, {tableName : 'sales', timestamps : true, updatedAt: false})

export default Sale
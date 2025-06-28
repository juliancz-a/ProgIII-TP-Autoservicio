import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username : {
    type: DataTypes.STRING,
    allowNull : false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull : false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
}, {tableName : 'users'});

export default User;

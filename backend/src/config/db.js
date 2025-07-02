import { Sequelize } from "sequelize";
import env from './env.js'

const {host, port, user, password, database} = env.db


const sequelize = new Sequelize(database, user, password, {
    host : host,
    port : port,
    dialect : 'mysql',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0,
    logging: false
});


try {
    await sequelize.authenticate() //Testing DB
    console.log('[Sequelize] -> Connection established');
    
} catch (error) {
    console.log(error); 
}

export default sequelize;
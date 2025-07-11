import dotenv from 'dotenv';

dotenv.config() 


export default {
    port : process.env.PORT,
    domain : process.env.PUBLIC_DOMAIN,
    db : {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    },
    cors : { origin : process.env.CORS_ORIGIN },
}
import db from 'mysql2/promise';


const pool = db.createPool({ 
    host : 'caboose.proxy.rlwy.net',
    port : 49685,
    user : 'root',
    password : 'VkTFshWNuNkCByYUqHEJEYQEAdUcXJEt',
    database : 'railway',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0,
});

export default pool;
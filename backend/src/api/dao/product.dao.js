import db from "../config/dbConfig.js";

const productDao = {

    async findAll() {
        const query = 'SELECT * FROM products';
        const [rows] = await db.query(query);
        
        return rows;

    },

    async findById(id) {

    },

    async create(product) {
        const {title, description, category, enabled, price, img} = product;

        const query = 'INSERT INTO products (title, description, category, enabled, price, img) VALUES (?, ?, ?, ?, ?, ?)'
        await db.execute(query, [title, description, category, enabled, price, img]);

    },  

    async updateById(id, product) {

    },

    async deleteById(id) {

    }
}

export default productDao
import db from "../config/dbConfig.js";

class productDao {

    async findAll() {
        const query = 'SELECT * FROM products';
        const [rows] = await db.query(query);
        
        return rows;
    }

    async findById(id) {
        const query = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.execute(query, [id])

        return rows;
    }

    async create(product) {
        const {title, description, category, enabled, price, img} = product;

        const query = 'INSERT INTO products (title, description, category, price, img, enabled) VALUES (?, ?, ?, ?, ?, ?)';
        await db.execute(query, [title, description, category, price, img, enabled]);
    }

    async updateById(id, product) {

        const {title, description, category, enabled, price, img} = product;

        const query = 'UPDATE products SET title = ?, description = ?, category = ?, price = ?, img = ?, enabled = ? WHERE id = ?';
        await db.execute(query, [title, description, category, price, img, enabled, id]);
    }

    async toggleEnabledById(id, enabled) {         
        const query = 'UPDATE products SET enabled = ? WHERE id = ?';
        await db.execute(query, [enabled, id]);
    }

    // async toggleEnabledProducts() {

    //     if (enabled) {
    //         const query = `UPDATE products SET enabled = 1 WHERE id = (${ids})`;
    //         await db.execute(query, [enabled, id]);

    //     } else {
    //         const query = `UPDATE products SET enabled = 0 WHERE id IN (${ids})`;
    //         await db.execute(query, [enabled, id]);
    //     }

    // }

    async deleteById(id) {

        const query = 'DELETE FROM products WHERE id = ?'
        await db.execute(query, [id]);
    }
}

export default new productDao();
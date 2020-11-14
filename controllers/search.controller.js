const pool = require('../database');

exports.findAll = async (searchTerm) => {
    try {
        let [results] = await pool.query(`
            SELECT
                id,
                name,
                (unit_price / 100) AS unitPrice,
                image,
                category_id as categoryId
            FROM product
            WHERE
                name LIKE ?
        `, `%${searchTerm}%`);

        return results;
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
};
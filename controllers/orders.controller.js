const connection = require('../database');

exports.findAll = (req, res) => {
    connection.query('SELECT * FROM order', (err, results) => {
        if (err) {
            console.log('error: ', err);
            res.send(err);
            return;
        }

        res.json(results);
    });
};

exports.create = (req, res) => {

};

exports.findOne = async (orderId) => {
    try {
        let [results] = await connection.query(`
            SELECT
                id,
                product_id AS productId,
                quantity,
                unit_price AS unitPrice,
                total_price AS totalPrice
            FROM
                order_line_item
            WHERE order_id = ?
        `, orderId);

        return {
            id: 'FT000001',
            totalPrice: 280,
            lineItems: results
        }
    } catch(error) {
        console.log('error: ', error);
        return error;
    }   
};

exports.delete = (req, res) => {

};
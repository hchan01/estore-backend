const pool = require('../database');

exports.addToCart = async (productId, quantity) => {
    let params = {
        cart_id: 1,
        product_id: productId,
        quantity: quantity
    }

    try {
        let result = await pool.query(`
            INSERT INTO cart_line_item SET ?
        `, params);

        return {
            id: 1
        };
    } catch(err) {
        console.log('error: ', error);
        return error;
    }
};

exports.create = (req, res) => {
    connection.query('INSERT INTO products (name, unit_price) VALUES (?, ?)', [req.body.name, req.body.unit_price], (err, results) => {
        if (err) {
            console.log('error: ', err);
            res.send(err);
            return;
        }

        res.json({
            message: 'Product successfully created.'
        });
    });
};

exports.findOne = async () => {
    try {
        let [results] = await pool.query(`
            SELECT
                product.id,
                product.name,
                product.unit_price AS unitPrice,
                cart_line_item.quantity,
                product.slug,
                product.image,
                ((product.unit_price * cart_line_item.quantity) / 100) AS totalPrice
            FROM cart_line_item
                INNER JOIN cart
                    ON cart_line_item.cart_id = cart.id
                INNER JOIN product
                    ON cart_line_item.product_id = product.id
            WHERE
                cart_line_item.cart_id = 1
        `);

        return results;
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
};

exports.deleteCart = (req, res) => {
    connection.query('DELETE FROM products WHERE id = ?', req.params.productId, (err, results) => {
        if (err) {
            console.log('error: ', err);
            res.send(err);
            return;
        }

        res.json({
            message: 'Product successfully deleted.'
        });
    });
};

exports.update = (req, res) => {
    connection.query('UPDATE products SET name = ?, unit_price = ? WHERE id = ?', [req.body.name, req.body.unit_price, req.params.productId], (err, results) => {
        if (err) {
            console.log('error: ', err);
            res.send(err);
            return;
        }

        res.json({
            message: 'Product successfully updated.'
        });
    });
};

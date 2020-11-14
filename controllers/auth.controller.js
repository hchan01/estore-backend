const connection = require('../database');

exports.findAll = (req, res) => {
    const params = [];
    let sql = 'SELECT * FROM products WHERE 1 = 1';

    if (req.query.category) {
        sql += ' AND category = ?';
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.log('error: ', err);
            res.send(err);
            return;
        }

        res.json(results);
    });
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

exports.findOne = (req, res) => {
    connection.query('SELECT * FROM products WHERE id = ?', req.params.productId, (err, results) => {
        if (err) {
            console.log('error: ', err);
            res.send(err);
            return;
        }

        let [product] = results;
        res.json(product);
    });
};

exports.delete = (req, res) => {
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

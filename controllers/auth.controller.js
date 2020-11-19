const pool = require('../database');

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

exports.create = async (email, password) => {
    const data = {
        email,
        password
    }

    try {
        let [results] = await pool.query('INSERT INTO user SET ?', data);

        return results;
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
};

exports.findOne = async (email) => {
    try {
        let [results] = await pool.query(`
            SELECT
                *
            FROM
                user
            WHERE
                email = ?
        `, email);

        return results[0] || null;
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
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

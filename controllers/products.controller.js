const pool = require('../database');

exports.findAll = async (categoryId) => {
    let filter = '';
    if (categoryId) {
        filter = `WHERE category_id = ${categoryId}`;
    }

    try {
        let [results] = await pool.query(`
            SELECT
                id,
                name,
                brand,
                (unit_price / 100) AS unitPrice,
                image,
                slug,
                category_id as categoryId
            FROM product
            ${filter}
        `);

        return results;
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
};

exports.create = (req, res) => {
    pool.query('INSERT INTO product (name, unit_price) VALUES (?, ?)', [req.body.name, req.body.unit_price], (err, results) => {
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

exports.findOne = async (productId) => {
    try {
        let [results] = await pool.query(`
            SELECT
                id,
                name,
                brand,
                (unit_price / 100) AS unitPrice,
                image,
                slug,
                category_id as categoryId
            FROM product
            WHERE
                id = ?
        `, productId);

        return results[0];
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
};

exports.delete = (req, res) => {
    pool.query('DELETE FROM product WHERE id = ?', req.params.productId, (err, results) => {
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
    pool.query('UPDATE product SET name = ?, unit_price = ? WHERE id = ?', [req.body.name, req.body.unit_price, req.params.productId], (err, results) => {
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

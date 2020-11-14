module.exports = app => {
    const ProductsController = require('../controllers/products.controller.js');

    app.route('/api/v1/products')
        .get(ProductsController.findAll)
        .post(ProductsController.create);

    app.route('/api/v1/products/:productId')
        .get(ProductsController.findOne)
        .delete(ProductsController.delete)
        .put(ProductsController.update);
}
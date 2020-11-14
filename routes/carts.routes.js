module.exports = app => {
    const CartsController = require('../controllers/carts.controller.js');

    app.route('/api/v1/carts')
        .post(CartsController.create);

    app.route('/api/v1/carts/:cartId')
        .get(CartsController.findOne)
        .post(CartsController.addProduct)
        .delete(CartsController.deleteCart);
}
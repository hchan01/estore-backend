module.exports = app => {
    const OrdersController = require('../controllers/orders.controller.js');

    app.route('/api/v1/orders')
        .get(OrdersController.findAll)
        .post(OrdersController.create);

    app.route('/api/v1/orders/:orderId')
        .get(OrdersController.findOne)
        .delete(OrdersController.delete);
}
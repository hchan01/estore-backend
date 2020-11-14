const jwt = require('jsonwebtoken');

const productsController = require('../controllers/products.controller');
const cartsController = require('../controllers/carts.controller');
const searchController = require('../controllers/search.controller');
const ordersController = require('../controllers/orders.controller');

const resolvers = {
    Query: {
        search: async (parent, { searchTerm }, context, info) => {
            return await searchController.findAll(searchTerm);
        },
        product: async (parent, { productId }, context, info) => {
            return await productsController.findOne(productId);
        },
        products: async (parent, { categoryId }, context, info) => {
            return await productsController.findAll(categoryId);
        },
        cart: async () => {
            return await cartsController.findOne();
        },
        order: async (parent, { orderId }, context, info) => {
            return await ordersController.findOne(orderId);
        }
    },
    Mutation: {
        createUser: (parent, { email, password }, context, info) => {
            
        },
        login: (parent, { email, password }, context, info) => {
            const token = jwt.sign(
                {
                    id: 'test',
                    email: 'dsfds'
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            return {
                token
            }
        },
        addToCart: async (parent, { productId, quantity }, context, info) => {
            return await cartsController.addToCart(productId, quantity);
        }
    }
};

module.exports = resolvers;
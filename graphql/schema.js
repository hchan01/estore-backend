const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        search(searchTerm: String!): [Product]
        product(productId: Int!): Product
        products(categoryId: Int): [Product]
        cart: [BasketItem]
        order(orderId: Int!): Order
    }

    type Product {
        id: ID!
        name: String!
        brand: String
        unitPrice: Float!
        image: String
        slug: String
        categoryId: Int
    }

    type BasketItem {
        id: ID!
        name: String!
        quantity: Int!
        unitPrice: Float!
        slug: String
        image: String
        totalPrice: Float!
    }

    type Mutation {
        createUser(email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        addToCart(productId: Int!, quantity: Int!): Cart
    }

    type User {
        id: Int!
        email: String!
    }

    type AuthPayload {
        token: String!
    }

    type Order {
        id: String!
        totalPrice: Float!
        lineItems: [OrderLineItem]
    }

    type OrderLineItem {
        id: Int!
        productId: Int!
        quantity: Int!
        unitPrice: Float!
        totalPrice: Float!
    }

    type addToCartInput {
        productId: Int!
        quantity: Int!
    }

    type Cart {
        id: Int!
    }
`

module.exports = typeDefs
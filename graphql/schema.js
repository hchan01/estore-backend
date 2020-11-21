const { nexusPrisma } = require('nexus-plugin-prisma');
const { objectType, stringArg, intArg, makeSchema } = require('@nexus/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.string("token")
    }
})
const CartLineItem = objectType({
    name: "CartLineItem",
    definition(t) {
        t.model.id()
        t.model.cartId()
        t.model.productId()
        t.model.quantity()
        t.model.product()
    }
})
const Cart = objectType({
    name: "Cart",
    definition(t) {
        t.model.id()
        t.model.userId()
        t.model.cartLineItem()
    }
})
const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.field("createUser", {
            type: AuthPayload,
            args: {
                email: stringArg({
                    required: true
                }),
                password: stringArg({
                    required: true
                }),
            },
            resolve: async (_, args, ctx) => {
                const user = await ctx.prisma.user.findOne({
                    where: {
                        email: args.email
                    }
                });

                if (user) {
                    return {
                        token: 'ERROR USER EXISTS'
                    }
                }

                await ctx.prisma.user.create({
                    data: {
                        email: args.email,
                        password: bcrypt.hashSync(args.password, 10)
                    }
                });

                return {
                    token: 'SUCCESS'
                } 
            }
        })

        t.field("login", {
            type: AuthPayload,
            args: {
                email: stringArg({
                    required: true
                }),
                password: stringArg({
                    required: true
                }),
            },
            resolve: async (_, args, ctx) => {
                const user = await ctx.prisma.user.findOne({
                    where: {
                        email: args.email
                    }
                });

                const valid = bcrypt.compareSync(args.password, user.password);

                if (!valid) {
                    return {
                        token: 'invalid details'
                    }
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                )

                return {
                    token
                }
            }
        })

        t.field("addToCart", {
            type: Cart,
            nullable: true,
            args: {
                productId: intArg({
                    required: true
                }),
                quantity: intArg({
                    required: true
                }),
            },
            resolve: async (_, args, ctx) => {
                await ctx.prisma.cartLineItem.create({
                    data: {
                        quantity: args.quantity,
                        cart: {
                            connect: {
                                id: 1
                            }
                        },
                        product: {
                            connect: {
                                id: args.productId
                            }
                        }
                    }
                });

                return {
                    id: 1
                }
            }
        })
    }
})
const Order = objectType({
    name: "Order",
    definition(t) {
        t.model.id()
        t.model.orderLineItem()
    }
})
const OrderLineItem = objectType({
    name: "OrderLineItem",
    definition(t) {
        t.model.id()
        t.model.productId()
        t.model.quantity()
        t.model.unitPrice()
        t.model.totalPrice()
    }
})
const Product = objectType({
    name: "Product",
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.brand()
        t.model.unitPrice()
        t.model.image()
        t.model.slug()
        t.model.categoryId()
    }
})
const Query = objectType({
    name: "Query",
    definition(t) {
        t.crud.product()
        t.crud.products({ pagination: true, filtering: true })

        t.crud.cart()
        t.crud.carts({ pagination: true, filtering: true })

        t.crud.order()
        t.crud.orders({ pagination: true, filtering: true })

        t.crud.user()
        t.crud.users({ pagination: true, filtering: true })

        t.field("search", {
            type: Product,
            list: [false],
            nullable: true,
            args: {
                searchTerm: stringArg({
                    required: true
                }),
            },
            resolve: (_, args, ctx) => {
                return ctx.prisma.product.findMany({
                    where: {
                        name: { contains: args.searchTerm }
                    }
                })
            }
        })
    }
})
const User = objectType({
    name: "User",
    definition(t) {
        t.model.id()
        t.model.email()
        t.model.password()
        t.model.firstName()
        t.model.lastName()
    }
})
const addToCartInput = objectType({
    name: "addToCartInput",
    definition(t) {
        t.int("productId")
        t.int("quantity")
    }
})

const schema = makeSchema({
    types: {
        Query,
        AuthPayload,
        Cart,
        CartLineItem,
        Mutation,
        Order,
        OrderLineItem,
        Product,
        Query,
        User,
        addToCartInput
    },
    plugins: [nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: __dirname + '/schema.graphql'
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ]
    },
})

module.exports = {
    schema
}
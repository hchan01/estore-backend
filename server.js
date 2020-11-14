if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use((req, res) => {
    res.status(404).send({
        url: `${req.originalUrl} not found.`
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB_URI } = require('./config');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({ req })
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log("MongoDB connected");
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server listening at port ${res.url}`);
    });
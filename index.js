const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB_URI } = require('./config');


const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query {
        fetchPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        fetchPosts: async () => {
            try {
                const posts = await Post.find({});
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log("MongoDB connected");
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server listening at port ${res.url}`);
    });
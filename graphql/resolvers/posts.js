const { AuthenticationError } = require("apollo-server");

const Post = require('../../models/Post');
const checkAuth = require("../../utils/check-auth");

module.exports = {
    Query: {
        fetchPosts: async () => {
            try {
                const posts = await Post.find({}).sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        fetchPost: async (_, { postId }) => {
            try {
                const post = Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error("Post not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context);

            if (!body.trim()) {
                throw new Error("Body cannot be empty");
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();
            return post;
        },
        deletePost: async (_, { postId }, context) => {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return "Post deleted successfully";
                } else {
                    throw new AuthenticationError("Not authorized to delete post");
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};
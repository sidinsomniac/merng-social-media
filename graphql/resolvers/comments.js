const Post = require('../../models/Post');
const checkAuth = require("../../utils/check-auth");
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (!body.trim()) {
                throw new UserInputError('Empty comment', {
                    error: {
                        body: 'Comment body cannot be empty'
                    }
                });
            }

            const post = await Post.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found');
            }
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId);

                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not permitted');
                }
            } else {
                throw new UserInputError('Post not found');
            }
        },
        likePost: async (_, { postId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                const alreadyLiked = post.likes.find(like => like.username === username);
                if (alreadyLiked) {
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
};
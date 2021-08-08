const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError("Invalid/Expired token");
            }
        }
        throw new Error("Authentication token format must be 'bearer <token>'");
    }
    throw new Error("Not authorized");
};
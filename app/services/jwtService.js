
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '24h';

const jwtService = {
    generateToken(user) {
        return jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );
    },

    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Token invalide');
        }
    }
};

module.exports = jwtService;
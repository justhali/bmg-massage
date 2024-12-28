
const jwtService = require('../services/jwtService');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwtService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Non autorisé' });
    }
};

module.exports = authMiddleware;
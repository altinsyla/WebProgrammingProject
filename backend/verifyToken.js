const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization'];
    
    if (!token) {
        res.status(403).json({message: 'token required'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({message: 'invalid token'});
    }

    return next();
};

module.exports = verifyToken;
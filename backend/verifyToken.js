const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    let  token = req.headers['authorization'];
    
    if (!token) {
        token = token.substring(7);
        res.status(403).json({message: 'token required'});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'qelsi');
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({message: 'invalid token'});
    }

    return next();
};

module.exports = verifyToken;
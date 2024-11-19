const jwt = require('jsonwebtoken');

// JWT Middleware
const jwtAuthMiddleware = (req, res, next) => {
    
    // first check the request header  has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error : 'Token not found'})


    // extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ error : 'Unauthorized'})
    }

    try {
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // attach user information to the request object
        req.userData = decoded;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error : 'Invalid token'})
    }
}

const generateToken = (userData) => {
    // generate the JWT token using the userdata(payload)
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn : 100})
}


module.exports = {jwtAuthMiddleware, generateToken};
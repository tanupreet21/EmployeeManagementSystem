const jwt = require('jsonwebtoken');

/**This middleware functions checks if a request is authenticated
 *  before allowing access to protected routes */
const auth = (req, res, next) => {
    // get token from request header(JWT are sent in Authorization headers)
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ status: false, message: 'No token'});
    }

    // Extract the token - ["Bearer" "<token>"]
    const token = authHeader.split(' ')[1];

    try {
        //verify the token - check for expire & whether it's signed with your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        res.status(401).json({ status: false, message: 'Invalid token'});
    }

};

module.exports = auth;
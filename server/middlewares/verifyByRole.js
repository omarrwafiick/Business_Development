const jwtToken = require('jsonwebtoken');

const VerifyTokenByRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.cookies?.token;   

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized access - no token was provided' });
        }

        try { 
            const decodedToken = jwtToken.verify(token, process.env.JWT_SECRET);
 
            req.userId = decodedToken.userId;
            req.userRole = decodedToken.userRole;    
            
            if (decodedToken.userRole.name.toLowerCase() !== requiredRole.toLowerCase()) {
                return res.status(403).json({ success: false, message: 'Forbidden - You do not have the required role' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Unauthorized access - token is expired or invalid' });
        }
    };
};

module.exports = { VerifyTokenByRole };
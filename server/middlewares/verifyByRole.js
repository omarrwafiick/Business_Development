const jwt = require('jsonwebtoken');

const VerifyTokenByRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.userRole = decoded.userRole;

      const userRoleName = decoded.userRole.name?.toLowerCase();
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole.map(r => r.toLowerCase())
        : [requiredRole.toLowerCase()];

      if (!allowedRoles.includes(userRoleName)) {
        return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
};

module.exports = { VerifyTokenByRole };

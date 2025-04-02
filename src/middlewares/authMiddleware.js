const jwt = require('jsonwebtoken');
require('dotenv').config();


function VerifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ERROR
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

function CheckRole(role) {
    return (req, res, next) => {
        // Check the user role
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
      }
      next();
    };
};

module.exports = {
    VerifyToken,
    CheckRole
  };

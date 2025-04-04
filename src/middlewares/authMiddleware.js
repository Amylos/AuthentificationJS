const jwt = require('jsonwebtoken');
require('dotenv').config();


function VerifyToken(req, res, next) {
    const token = req.cookies.session.token;
    if (!token) return res.status(400).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};




function VerifyTokenView(req, res, next) {
    if (!req.cookies || !req.cookies.session || !req.cookies.session.token) {
        return res.redirect('/login');
    }
    const token = req.cookies.session.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token invalid", error);
        res.redirect('/login');
    }
}


function CheckRole(role) {
    return (req, res, next) => {
        try{
            // Check the user role
            if(req.cookies.session.role == 'admin') next();
            if (req.cookies.session.role !== role) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }
            next();
        }catch(ex){
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
    };
};

function CheckRoleView(role) {
    return (req, res, next) => {
        try {
            if (!req.cookies || !req.cookies.session || !req.cookies.session.role) {
                return res.redirect('/login');
            }

            if (req.cookies.session.role === 'admin') {
                return next();
            }

            if (req.cookies.session.role !== role) {
                return res.redirect('/home');
            }

            next();
        } catch (ex) {
            console.error("Erreur dans CheckRoleView:", ex);
            res.redirect('/login');
        };
    }
}

module.exports = {
    VerifyToken,
    CheckRole,
    CheckRoleView,
    VerifyTokenView
  };

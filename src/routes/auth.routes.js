const express = require('express');
const bcrypt = require('bcrypt');
const router = express();

const {Register,Login, Logout} = require('../controllers/auth.controller');
const {VerifyToken, CheckRole} = require('../middlewares/authMiddleware');

router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',VerifyToken, Logout);

router.get('/token', VerifyToken, CheckRole('user'), (req, res) => {
    res.status(200).json({ message: 'Token is working' });
});

module.exports = router;


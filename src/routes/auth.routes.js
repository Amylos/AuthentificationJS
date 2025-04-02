const express = require('express');
const bcrypt = require('bcrypt');
const router = express();

const {Register,Login, Logout} = require('../controllers/auth.controllerMysql');
const {VerifyToken, CheckRole} = require('../middlewares/authMiddleware');

// Mysql
router.post('/register',Register);
router.post('/login',Login);
router.get('/logout', Logout);

router.get('/token', VerifyToken, (req, res) => {
    res.status(200).json({ message: 'Token is working' });
});

module.exports = router;


// Mongo DB
// const {RegisterMONGO, LoginMONGO} = require('../controllers/auth.controllerMongo');
// router.post('/RegisterMONGO',RegisterMONGO);
// router.post('/loginMONGO',LoginMONGO);

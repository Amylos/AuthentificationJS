const express = require('express');
const router = express();
const {CheckRoleView,VerifyTokenView} = require('../middlewares/authMiddleware');

router.set('view engine', 'ejs');
router.set('views', __dirname + '/../views');


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/home',VerifyTokenView, CheckRoleView('user'), (req, res) => {
    console.log(req.cookies);
    res.render('home', { session: req.cookies.session });
});

router.get('/admin',VerifyTokenView, CheckRoleView('admin'), (req, res) => {
    res.render('admin');
});



module.exports = router;
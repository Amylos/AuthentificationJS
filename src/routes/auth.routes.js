const express = require('express');
const router = express();

const {Register,Login} = require('../controllers/auth.controller');

router.post('/register',Register);
router.get('/login',Login);



module.exports = router;

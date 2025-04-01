const express = require('express');
const router = express();

const {RegisterMYSQL,LoginMYSQL} = require('../controllers/auth.controllerMysql');
const {RegisterMONGO, LoginMONGO} = require('../controllers/auth.controllerMongo');

// Mysql
router.post('/registerMYSQL',RegisterMYSQL);
router.get('/loginMYSQL',LoginMYSQL);

// Mongo DB
router.post('/RegisterMONGO',RegisterMONGO);
router.get('/loginMONGO',LoginMONGO);

module.exports = router;

const express = require('express');
const router = express();

const authRoutes = require('./auth.routes.js');
const userRoutes = require('./user.routes.js');

router.use('/auth', authRoutes);
router.use('/user',userRoutes);

module.exports = router;

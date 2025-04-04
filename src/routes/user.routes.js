const express = require('express');
const router = express();

const {VerifyToken, CheckRole} = require('../middlewares/authMiddleware');
const {DeleteUser} = require('../controllers/user.controller');

router.delete('/delete', VerifyToken, CheckRole('admin'), DeleteUser);
// router.get('/users',VerifyToken, CheckRole('admin'),);

module.exports = router;


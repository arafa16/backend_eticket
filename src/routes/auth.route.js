const express = require('express');
const { register, login, getMe, sendEmailReset, getTokenReset, resetPassword } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router =  express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.post('/mail', sendEmailReset);
router.get('/reset/:token', getTokenReset);
router.post('/reset/:token', resetPassword);

module.exports = router;
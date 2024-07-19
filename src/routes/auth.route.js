const express = require('express');
const { register, login, getMe, sendEmailReset } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router =  express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.post('/reset/send', sendEmailReset);

module.exports = router;
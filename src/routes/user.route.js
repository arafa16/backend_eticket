const express = require('express');
const { getUsers, getUserById, getUserByTable } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getUsers);

module.exports = router;
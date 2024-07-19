const express = require('express');
const { getTickets } = require('../controllers/ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getTickets);

module.exports = router;
const express = require('express');
const { getTickets, createTicket, updateTicket, deleteTicket, hardDeleteTicket } = require('../controllers/ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getTickets);
router.post('/', verifyToken, createTicket);
router.patch('/:uuid', verifyToken, updateTicket);
router.delete('/:uuid', verifyToken, deleteTicket);
router.delete('/hard/:uuid', verifyToken, hardDeleteTicket);

module.exports = router;
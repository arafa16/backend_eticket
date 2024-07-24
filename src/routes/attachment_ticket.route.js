const express = require('express');
const { createAttachmentTicket } = require('../controllers/attachment_ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

// router.get('/', verifyToken, getTickets);
router.post('/ticket/:uuid', verifyToken, createAttachmentTicket);
// router.patch('/:uuid', verifyToken, updateTicket);
// router.delete('/:uuid', verifyToken, deleteTicket);
// router.delete('/hard/:uuid', verifyToken, hardDeleteTicket);

module.exports = router;
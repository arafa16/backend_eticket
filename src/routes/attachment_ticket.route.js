const express = require('express');
const { createAttachmentTicket, deleteAttachmentTicket } = require('../controllers/attachment_ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/:uuid', verifyToken, createAttachmentTicket);
router.delete('/:uuid', verifyToken, deleteAttachmentTicket);

module.exports = router;
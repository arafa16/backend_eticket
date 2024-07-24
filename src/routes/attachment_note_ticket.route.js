const express = require('express');
const { createAttachmentNoteTicket, deleteAttachmentNoteTicket } = require('../controllers/attachment_note_ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/:uuid', verifyToken, createAttachmentNoteTicket);
router.delete('/:uuid', verifyToken, deleteAttachmentNoteTicket);

module.exports = router;
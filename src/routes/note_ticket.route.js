const express = require('express');
const { createNoteTicket, updateNoteTicket, deleteNoteTicket, hardDeleteNoteTicket, getNoteTicketByTicket} = require('../controllers/note_ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/data', verifyToken, getNoteTicketByTicket);
router.post('/data', verifyToken, createNoteTicket);
router.patch('/data/:uuid', verifyToken, updateNoteTicket);
router.delete('/data/:uuid', verifyToken, deleteNoteTicket);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteNoteTicket);

module.exports = router;
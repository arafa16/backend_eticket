const express = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const { 
    getStatusNotes, 
    getStatusNoteSelect, 
    getStatusNoteById, 
    createStatusNote,
    deleteStatusNote,
    hardDeleteStatusNote,
    updateStatusNote
} = require('../controllers/status_note.controller');

const router = express.Router();

router.get('/data', verifyToken, getStatusNotes);
router.get('/select', verifyToken, getStatusNoteSelect);
router.get('/data/:uuid', verifyToken, getStatusNoteById);
router.post('/data', verifyToken, createStatusNote);
router.patch('/data/:uuid', verifyToken, updateStatusNote);
router.delete('/data/:uuid', verifyToken, deleteStatusNote);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteStatusNote);

module.exports = router;
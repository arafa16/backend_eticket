const express = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const { 
    getStatusTickets, 
    getStatusTicketsTable, 
    getStatusTicketSelect, 
    getStatusTicketById, 
    createStatusTicket,
    deleteStatusTicket,
    hardDeleteStatusTicket,
    updateStatusTicket,
    getStatusTicketByCode
} = require('../controllers/status_ticket.controller');

const router = express.Router();

router.get('/data', verifyToken, getStatusTickets);
router.get('/table', verifyToken, getStatusTicketsTable);
router.get('/select', verifyToken, getStatusTicketSelect);
router.get('/data/:uuid', verifyToken, getStatusTicketById);
router.get('/data/code/:code', verifyToken, getStatusTicketByCode);
router.post('/data', verifyToken, createStatusTicket);
router.patch('/data/:uuid', verifyToken, updateStatusTicket);
router.delete('/data/:uuid', verifyToken, deleteStatusTicket);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteStatusTicket);

module.exports = router;
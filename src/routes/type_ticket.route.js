const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { getTypeTickets, getTypeTicketsSelect, getTypeTicketByUuid, deleteTypeTicket, hardDeleteTypeTicket, createTypeTicket, updateTypeTicket } = require('../controllers/type_ticket.controller');

const router =  express.Router();

router.get('/data', verifyToken, getTypeTickets);
router.get('/select', getTypeTicketsSelect);
router.get('/data/:uuid', verifyToken, getTypeTicketByUuid);
router.post('/data', verifyToken, createTypeTicket);
router.patch('/data/:uuid', verifyToken, updateTypeTicket);
router.delete('/data/:uuid', verifyToken, deleteTypeTicket);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteTypeTicket);

module.exports = router;
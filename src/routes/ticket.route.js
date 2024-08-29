const express = require('express');
const { 
    getTickets, 
    createTicket, 
    updateTicket, 
    updateStatusTicket, 
    deleteTicket, 
    hardDeleteTicket, 
    getTicketByUser, 
    getTicketById,
    getTicketByPic
} = require('../controllers/ticket.controller.js');
const {verifyToken} = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getTickets);
router.get('/data', verifyToken, getTicketById);
router.get('/user', verifyToken, getTicketByUser);
router.get('/pic', verifyToken, getTicketByPic);
router.post('/', verifyToken, createTicket);
router.patch('/:uuid', verifyToken, updateTicket);
router.patch('/status/:uuid', verifyToken, updateStatusTicket);
router.delete('/:uuid', verifyToken, deleteTicket);
router.delete('/hard/:uuid', verifyToken, hardDeleteTicket);

module.exports = router;
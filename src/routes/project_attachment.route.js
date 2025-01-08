const express = require('express');
const { 
    createAttachment, 
    deleteAttachment 
} = require('../controllers/project_attachment.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/data/:uuid', verifyToken, createAttachment);
router.delete('/data/:uuid', verifyToken, deleteAttachment);

module.exports = router;
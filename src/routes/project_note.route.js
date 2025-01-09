const express = require('express');
const { 
    getDataByProject,
    createData,
    updateData,
    deleteData,
    hardDeleteData
} = require('../controllers/project_note.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/data', verifyToken, getDataByProject);
router.post('/data', verifyToken, createData);
router.patch('/data/:uuid', verifyToken, updateData);
router.delete('/data/:uuid', verifyToken, deleteData);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteData);

module.exports = router;
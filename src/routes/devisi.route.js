const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { getDevisis, getDevisisSelect, getDevisiByUuid, deleteDevisi, hardDeleteDevisi, createDevisi, updateDevisi } = require('../controllers/devisi.controller');

const router =  express.Router();

router.get('/data', verifyToken, getDevisis);
router.get('/select', getDevisisSelect);
router.get('/data/:uuid', verifyToken, getDevisiByUuid);
router.post('/data', verifyToken, createDevisi);
router.patch('/data/:uuid', verifyToken, updateDevisi);
router.delete('/data/:uuid', verifyToken, deleteDevisi);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteDevisi);

module.exports = router;
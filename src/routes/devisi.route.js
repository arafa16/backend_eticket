const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { getDevisis, getDevisisSelect, getDevisiByUuid, deleteDevisi, hardDeleteDevisi } = require('../controllers/devisi.controller');

const router =  express.Router();

router.get('/data', getDevisis);
router.get('/select', getDevisisSelect);
router.get('/select/:uuid', getDevisiByUuid);
router.delete('/data/:uuid', deleteDevisi);
router.delete('/data/hard/:uuid', hardDeleteDevisi);

module.exports = router;
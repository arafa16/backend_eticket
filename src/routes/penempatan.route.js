const express = require('express');
const{ getPenenpatans, getPenenpatanSelect, getPenempatanByUuid, createPenenpatan, updatePenempatan, deletePenempatan, hardDeletePenempatan } = require('../controllers/penempatan.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/data', verifyToken, getPenenpatans);
router.get('/select', getPenenpatanSelect);
router.get('/data/:uuid', verifyToken, getPenempatanByUuid);
router.post('/data', verifyToken, createPenenpatan);
router.patch('/data/:uuid', verifyToken, updatePenempatan);
router.delete('/data/:uuid', verifyToken, deletePenempatan);
router.delete('/data/hard/:uuid', verifyToken, hardDeletePenempatan);


module.exports = router;
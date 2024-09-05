const express = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const { createSlide, getSLiders, getSLiderTable, deleteSLider, getSLiderById } = require('../controllers/slider.controller');

const router = express.Router();

router.post('/', verifyToken, createSlide);
router.get('/', verifyToken, getSLiders);
router.get('/table', verifyToken, getSLiderTable);
router.delete('/data/:uuid', verifyToken, deleteSLider);
router.get('/data/:uuid', verifyToken, getSLiderById);

module.exports = router;
const express = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const { createSlide, getSLiders } = require('../controllers/slider.controller');

const router = express.Router();

router.post('/', verifyToken, createSlide);
router.get('/', verifyToken, getSLiders);

module.exports = router;
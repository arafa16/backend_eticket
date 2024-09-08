const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { getById, createById, updateById, hardDeleteById } = require('../controllers/privilege.controller');

const router = express.Router();

router.get('/data/:uuid', verifyToken, getById)
router.post('/data/:uuid', verifyToken, createById)
router.patch('/data/:uuid', verifyToken, updateById)
router.delete('/data/:uuid', verifyToken, hardDeleteById)

module.exports = router;
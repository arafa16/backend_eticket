const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { getByUser, createByUser, updateByUser, hardDeleteByUser } = require('../controllers/privilege.controller');

const router = express.Router();

router.get('/:name', verifyToken, getByUser)
router.post('/:name', verifyToken, createByUser)
router.patch('/:name', verifyToken, updateByUser)
router.delete('/:name', verifyToken, hardDeleteByUser)

module.exports = router;
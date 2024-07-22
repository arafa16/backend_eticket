const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { getByUser, createByUser, updateByUser, hardDeleteByUser } = require('../controllers/privilege.controller');

const router = express.Router();

router.get('/:name', getByUser)
router.post('/:name', createByUser)
router.patch('/:name', updateByUser)
router.delete('/:name', hardDeleteByUser)

module.exports = router;
const express = require('express');
const { getUsers, createUser, deleteUser, hardDeleteUser, updateUser, updatePassword } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.post('/', verifyToken, createUser);
router.patch('/:uuid', verifyToken, updateUser);
router.patch('/password/:uuid', verifyToken, updatePassword);
router.delete('/:uuid', verifyToken, deleteUser);
router.delete('/hard/:uuid', verifyToken, hardDeleteUser);

module.exports = router;
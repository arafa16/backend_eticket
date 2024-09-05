const express = require('express');
const { getUsers, createUser, deleteUser, hardDeleteUser, updateUser, updatePassword, setPhotoProfile, getExecutorSelect, getUserSelect, getUserById } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/data/executor', verifyToken, getExecutorSelect);
router.get('/data/user', verifyToken, getUserSelect);
router.post('/', verifyToken, createUser);
router.patch('/:uuid', verifyToken, updateUser);
router.get('/:uuid', verifyToken, getUserById);
router.patch('/password/:uuid', verifyToken, updatePassword);
router.delete('/:uuid', verifyToken, deleteUser);
router.patch('/photo/:uuid', verifyToken, setPhotoProfile);
router.delete('/hard/:uuid', verifyToken, hardDeleteUser);

module.exports = router;
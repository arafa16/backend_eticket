const express = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const { 
    getStatusUsers, 
    getStatusUserSelect, 
    getStatusUserById, 
    createStatusUser,
    deleteStatusUser,
    hardDeleteStatusUser,
    updateStatusUser
} = require('../controllers/status_user.controller');

const router = express.Router();

router.get('/data', verifyToken, getStatusUsers);
router.get('/select', verifyToken, getStatusUserSelect);
router.get('/data/:uuid', verifyToken, getStatusUserById);
router.post('/data', verifyToken, createStatusUser);
router.patch('/data/:uuid', verifyToken, updateStatusUser);
router.delete('/data/:uuid', verifyToken, deleteStatusUser);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteStatusUser);

module.exports = router;
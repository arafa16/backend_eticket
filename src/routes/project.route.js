const express = require('express');
const { 
    getDatas, 
    createData, 
    updateData, 
    updateStatusData, 
    deleteData, 
    hardDeleteData, 
    getDatasByUser, 
    getDataById,
    getDatasByPic,
    getCount
} = require('../controllers/project.controller.js');
const {verifyToken} = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/datas', verifyToken, getDatas);
router.get('/count', verifyToken, getCount);
router.get('/data', verifyToken, getDataById);
router.get('/user', verifyToken, getDatasByUser);
router.get('/pic', verifyToken, getDatasByPic);
router.post('/data', verifyToken, createData);
router.patch('/data/:uuid', verifyToken, updateData);
router.patch('/status/:uuid', verifyToken, updateStatusData);
router.delete('/data/:uuid', verifyToken, deleteData);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteData);

module.exports = router;
const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const {
    getDatas, 
    getDataSelect, 
    getDataByUuid, 
    deleteData, 
    hardDeleteData, 
    createData, 
    updateData
} = require('../controllers/project_type.controller')
const router =  express.Router();

router.get('/datas', verifyToken, getDatas);
router.get('/datas/select', getDataSelect);                                 
router.get('/data/:uuid', verifyToken, getDataByUuid);
router.post('/data', verifyToken, createData);
router.patch('/data/:uuid', verifyToken, updateData);
router.delete('/data/:uuid', verifyToken, deleteData);
router.delete('/data/hard/:uuid', verifyToken, hardDeleteData);

module.exports = router;
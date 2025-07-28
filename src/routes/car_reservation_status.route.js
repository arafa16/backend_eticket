const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { 
    getCarReservationStatus,
    getCarReservationStatusByUuid,
    deleteCarReservationStatus,
    createCarReservationStatus,
    updateCarReservationStatus,
    getCarReservationStatusDatas
} = require('../controllers/car_reservation_status.controller');

const router = express.Router();

router.get('/data', verifyToken, getCarReservationStatus);
router.get('/datas', verifyToken, getCarReservationStatusDatas);
router.get('/data/:uuid', verifyToken, getCarReservationStatusByUuid);
router.post('/data', verifyToken, createCarReservationStatus);
router.patch('/data/:uuid', verifyToken, updateCarReservationStatus);
router.delete('/data/:uuid', verifyToken, deleteCarReservationStatus);

module.exports = router;
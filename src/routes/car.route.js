const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');
const { 
    getCars,
    getCarByUuid,
    deleteCar,
    createCar,
    updateCar
} = require('../controllers/car.controller');

const router =  express.Router();

router.get('/data', verifyToken, getCars);
router.get('/data/:uuid', verifyToken, getCarByUuid);
router.post('/data', verifyToken, createCar);
router.patch('/data/:uuid', verifyToken, updateCar);
router.delete('/data/:uuid', verifyToken, deleteCar);

module.exports = router;
const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getCarReservations,
  getCarReservationByUuid,
  deleteCarReservation,
  createCarReservation,
  getAttributeCarReservation,
  updateCarReservation,
} = require("../controllers/car_reservation.controller");

const router = express.Router();

router.get("/data", verifyToken, getCarReservations);
router.get("/data/:uuid", verifyToken, getCarReservationByUuid);
router.post("/data", verifyToken, createCarReservation);
router.patch("/data/:uuid", verifyToken, updateCarReservation);
router.patch("/data/:uuid/attribute", verifyToken, getAttributeCarReservation);
router.delete("/data/:uuid", verifyToken, deleteCarReservation);

module.exports = router;

const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  getVehicleAllocations,
  getVehicleAllocationByUuid,
  createVehicleAllocation,
  updateVehicleAllocation,
  deleteVehicleAllocation,
} = require("../controllers/vehicle_allocation.controller");

const router = express.Router();

router.get("/data", verifyToken, getVehicleAllocations);
router.get("/data/:uuid", verifyToken, getVehicleAllocationByUuid);
router.post("/data", verifyToken, createVehicleAllocation);
router.patch("/data/:uuid", verifyToken, updateVehicleAllocation);
router.delete("/data/:uuid", verifyToken, deleteVehicleAllocation);

module.exports = router;

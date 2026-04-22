const { vehicle_allocation: vehicleAllocationModel } = require("../models");

const getVehicleAllocations = async (req, res) => {
  const { uuid, name, sort, is_active, is_select, is_delete } = req.query;

  const queryObject = {};
  let sortList = {};

  if (uuid) {
    queryObject.uuid = uuid;
  }

  if (name) {
    queryObject.name = name;
  }

  if (is_active) {
    queryObject.is_active = is_active;
  }

  if (is_select) {
    queryObject.is_select = JSON.parse(is_select);
  }

  if (sort) {
    sortList = sort;
  } else {
    sortList = "id";
  }

  if (is_delete) {
    queryObject.is_delete = is_delete;
  } else {
    queryObject.is_delete = 0;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = Number(page - 1) * limit;

  try {
    const vihicle_allocations = await vehicleAllocationModel.findAndCountAll({
      where: queryObject,
      limit,
      offset,
      order: [sortList],
    });

    return res.status(200).json({
      message: "success",
      data: vihicle_allocations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getVehicleAllocationByUuid = async (req, res) => {
  const { uuid } = req.params;

  try {
    const vihicle_allocation = await vehicleAllocationModel.findOne({
      where: {
        uuid,
      },
    });

    if (!vihicle_allocation) {
      return res.status(404).json({
        message: "vihicle_allocation not found",
      });
    }

    return res.status(200).json({
      message: "success",
      data: vihicle_allocation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createVehicleAllocation = async (req, res) => {
  const { name, sequence, is_select, is_active } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  try {
    const vihicle_allocation = await vehicleAllocationModel.create({
      name,
      sequence,
      is_select,
      is_active,
    });

    return res.status(201).json({
      message: "Vehicle allocation created successfully",
      data: vihicle_allocation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateVehicleAllocation = async (req, res) => {
  const { uuid } = req.params;
  const { name, sequence, is_select, is_active, is_delete } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  try {
    const vihicle_allocation = await vehicleAllocationModel.findOne({
      where: {
        uuid,
      },
    });

    if (!vihicle_allocation) {
      return res.status(404).json({
        message: "Vehicle allocation not found",
      });
    }

    await vihicle_allocation.update({
      name,
      sequence,
      is_select,
      is_active,
      is_delete,
    });

    return res.status(200).json({
      message: "Vehicle allocation updated successfully",
      data: vihicle_allocation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteVehicleAllocation = async (req, res) => {
  const { uuid } = req.params;
  const { permanent } = req.query;

  try {
    const vihicle_allocation = await vehicleAllocationModel.findOne({
      where: {
        uuid,
      },
    });

    if (!vihicle_allocation) {
      return res.status(404).json({
        message: "Vehicle allocation not found",
      });
    }

    if (permanent) {
      const value = Number(permanent);
      const boolean_value = Boolean(value);

      if (boolean_value) {
        await vihicle_allocation.destroy();

        return res.status(200).json({
          message: "Vehicle allocation permanent deleted successfully",
        });
      } else {
        vihicle_allocation.is_delete = boolean_value;

        await vihicle_allocation.save();

        return res.status(200).json({
          message: "Vehicle allocation deleted successfully",
        });
      }
    }

    vihicle_allocation.is_delete = true;

    await vihicle_allocation.save();

    return res.status(200).json({
      message: "Vehicle allocation deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getVehicleAllocations,
  getVehicleAllocationByUuid,
  createVehicleAllocation,
  updateVehicleAllocation,
  deleteVehicleAllocation,
};

const {car:carModel} = require('../models');

const getCars = async (req, res) => {
    const {uuid, name, sort, is_active, is_select, is_delete} = req.query;

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
        queryObject.is_select = is_select;
    }

    if (sort) {
        sortList = sort;
    } else {
        sortList = 'id';
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
        const cars = await carModel.findAndCountAll({
            where: queryObject,
            limit,
            offset,
            order: [sortList]
        });

        return res.status(200).json({
            message: 'success',
            data: cars
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getCarByUuid = async (req, res) => {
    const {uuid} = req.params;

    try {
        const car = await carModel.findOne({
            where: {
                uuid
            }
        });

        if (!car) {
            return res.status(404).json({
                message: 'Car not found'
            });
        }

        return res.status(200).json({
            message: 'success',
            data: car
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const createCar = async (req, res) => {
    const {name, is_select, is_active} = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        });
    }

    try {
        const car = await carModel.create({
            name,
            is_select,
            is_active
        });

        return res.status(201).json({
            message: 'Car created successfully',
            data: car
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const updateCar = async (req, res) => {
    const {uuid} = req.params;
    const {name, is_select, is_active, is_delete} = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        });
    }

    try {
        const car = await carModel.findOne({
            where: {
                uuid
            }
        });

        if (!car) {
            return res.status(404).json({
                message: 'Car not found'
            });
        }

        await car.update({
            name,
            is_select,
            is_active,
            is_delete
        });

        return res.status(200).json({
            message: 'Car updated successfully',
            data: car
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const deleteCar = async (req, res) => {
    const {uuid} = req.params;
    const {permanent} = req.query;

    try {
        const car = await carModel.findOne({
            where: {
                uuid
            }
        });

        if (!car) {
            return res.status(404).json({
                message: 'Car not found'
            });
        }

        if(permanent){
            const value = Number(permanent)
            const boolean_value = Boolean(value)

            if(boolean_value){
                await car.destroy();

                return res.status(200).json({
                    message: 'Car permanent deleted successfully'
                });
            }else{
                car.is_delete = boolean_value;

                await car.save();

                return res.status(200).json({
                    message: 'Car deleted successfully'
                });
            }
        }

        car.is_delete = true;

        await car.save();

        return res.status(200).json({
            message: 'Car deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getCars,
    getCarByUuid,
    createCar,
    updateCar,
    deleteCar
};
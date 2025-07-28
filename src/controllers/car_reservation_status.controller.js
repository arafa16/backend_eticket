const {
    car_reservation_status:carReservationStatusModel
} = require('../models');

const getCarReservationStatus = async (req, res) => {
    const {uuid, name, is_active, is_select, is_delete, sort} = req.query;

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
        queryObject.is_delete = false;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    try {
        const carReservationStatus = await carReservationStatusModel.findAndCountAll({
            where: queryObject,
            limit,
            offset,
            order: [sortList]
        });

        return res.status(200).json({
            message: 'success',
            data: carReservationStatus
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getCarReservationStatusDatas = async (req, res) => {
    let sortList = {};
    
    if (sort) {
        sortList = sort;
    } else {
        sortList = 'sequence';
    }

    try {
        const carReservationStatus = await carReservationStatusModel.findAndCountAll({
            where: {
                is_active:true
            },
            order: [sortList]
        });

        return res.status(200).json({
            message: 'success',
            data: carReservationStatus
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getCarReservationStatusByUuid = async (req, res) => {
    const {uuid} = req.params;

    try {
        const carReservationStatus = await carReservationStatusModel.findOne({
            where: {uuid}
        });

        if (!carReservationStatus) {
            return res.status(404).json({
                message: 'Car reservation status not found'
            });
        }

        return res.status(200).json({
            message: 'success',
            data: carReservationStatus
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const createCarReservationStatus = async (req, res) => {
    const {name, sequence, is_select, is_active} = req.body;

    try {
        const newCarReservationStatus = await carReservationStatusModel.create({
            name,
            sequence,
            is_active,
            is_select
        });

        return res.status(201).json({
            message: 'Car reservation status created successfully',
            data: newCarReservationStatus
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const updateCarReservationStatus = async (req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_active, is_select} = req.body;

    try {
        const carReservationStatus = await carReservationStatusModel.findOne({
            where: {uuid}
        });

        if (!carReservationStatus) {
            return res.status(404).json({
                message: 'Car reservation status not found'
            });
        }

        carReservationStatus.name = name || carReservationStatus.name;
        carReservationStatus.sequence = sequence || carReservationStatus.sequence;
        if(is_active){
            const value = Number(is_active);
            carReservationStatus.is_active = Boolean(value);

        }
        if(is_select){
            const value = Number(is_select);
            carReservationStatus.is_select = Boolean(value);

        }
        
        await carReservationStatus.save();

        return res.status(200).json({
            message: 'Car reservation status updated successfully',
            data: carReservationStatus
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const deleteCarReservationStatus = async (req, res) => {
    const {uuid} = req.params;
    const {permanent} = req.query;

    try {
        const carReservationStatus = await carReservationStatusModel.findOne({
            where: {uuid}
        });

        if (!carReservationStatus) {
            return res.status(404).json({
                message: 'Car reservation status not found'
            });
        }

        console.log(permanent, 'permanent')

        if(permanent){
            const value = Number(permanent)
            const boolean_value = Boolean(value)

            if(boolean_value){
                await carReservationStatus.destroy();

                return res.status(200).json({
                    message: 'Car reservation status permanent deleted successfully'
                });
            }else{
                carReservationStatus.is_delete = boolean_value;

                await carReservationStatus.save();

                return res.status(200).json({
                    message: 'Car reservation status deleted successfully'
                });
            }
        }

        carReservationStatus.is_delete = true;

        await carReservationStatus.save();

        return res.status(200).json({
            message: 'Car reservation status deleted successfully'
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getCarReservationStatus,
    getCarReservationStatusDatas,
    getCarReservationStatusByUuid,
    createCarReservationStatus,
    updateCarReservationStatus,
    deleteCarReservationStatus
};
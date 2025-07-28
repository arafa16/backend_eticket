const {
    car_reservation:carReservationModel,
    car_reservation_history:carReservationHistoryModel,
    car_reservation_status:carReservationStatusModel,
    car:carModel,
    user : userModel,
} = require('../models');
const {createCarReservationHistory:createHistory} = require('./car_reservation_history.controller');

const getCarReservations = async (req, res) => {
    const {uuid, car_id, user_uuid, driver_uuid, sort, is_active, is_delete} = req.query;

    const queryObject = {};
    let sortList = {};

    if (uuid) {
        queryObject.uuid = uuid;
    }

    if (car_id) {
        queryObject.car_id = car_id;
    }

    if (is_active) {
        queryObject.is_active = is_active;
    }

    if (user_uuid) {
        const user = await userModel.findOne({
            where:{
                uuid:user_uuid
            }
        });

        queryObject.user_id = user.id;
    }

    if (driver_uuid) {
        const user = await userModel.findOne({
            where:{
                uuid:driver_uuid
            }
        });

        queryObject.driver_id = user.id;
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
        const carReservations = await carReservationModel.findAndCountAll({
            where: queryObject,
            include:[
                {
                    model:userModel
                },
                {
                    model:carReservationStatusModel
                },
            ],
            limit,
            offset,
            order: [sortList]
        });

        return res.status(200).json({
            message: 'success',
            data: carReservations
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getCarReservationByUuid = async (req, res) => {
    const {uuid} = req.params;
    const {is_delete} = req.query;

    const queryObject = {};

    if (uuid) {
        queryObject.uuid = uuid;
    } else {
        return res.status(404).json({
            message: 'Car reservation not found'
        });
    }

    if (is_delete) {
        queryObject.is_delete = is_delete;
    } else {
        queryObject.is_delete = 0;
    }

    try {
        const carReservation = await carReservationModel.findOne({
            where: queryObject,
            include:[
                {
                    model:userModel
                },
                {
                    model:userModel,
                    as:'driver'
                },
                {
                    model:carReservationHistoryModel
                },
                {
                    model:carReservationStatusModel
                }
            ],
            order:[[{model: carReservationHistoryModel}, 'created_at', 'DESC']]
        });

        if (!carReservation) {
            return res.status(404).json({
                message: 'Car reservation not found'
            });
        }

        return res.status(200).json({
            message: 'success',
            data: carReservation
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const createCarReservation = async (req, res) => {
    const {
        car_uuid, 
        user_uuid,
        start_location,
        finish_location,
        description,
        driver_uuid, 
        start_date, 
        end_date,
        car_reservation_status_uuid,
    } = req.body;

    const date = new Date();
    const year = date.getFullYear();
    

    const findData = await carReservationModel.findAndCountAll({
        where:{
            year
        }
    });


    const makeCode = Number(findData.count) + 1;

    const code = `${makeCode}${year}`
    const codeReservation = `CR${makeCode}${year}`;

    let status = 1;

    if(car_reservation_status_uuid){
        const car_reservation_status = await carReservationStatusModel.findOne({
            uuid:car_reservation_status_uuid
        });

        status = car_reservation_status.id
    }

    try {
        let user_id = null;

        if(user_uuid){
            const user = await userModel.findOne({
                uuid:user_uuid
            });

            user_id = user.id
        }

        let driver_id = null

        if(driver_uuid){
            const driver = await userModel.findOne({
                uuid:driver_uuid
            });

            if(driver !== null){
                driver_id = driver.id
            }
        }

        let car_id = null

        if(car_uuid){
            const car = await carModel.findOne({
                uuid:car_uuid
            });

            if(car !== null){
                car_id = car.id
            }
        }

        const newCarReservation = await carReservationModel.create({
            car_id, 
            user_id,
            year,
            start_location,
            finish_location,
            description,
            start_date,
            end_date,
            driver_id,
            code: code,
            display_code: codeReservation,
            car_reservation_status_id:status
        });

        await createHistory({
            car_reservation_id:newCarReservation.id, 
            user_name:req.user.name, 
            description:'create reservation'
        })

        return res.status(201).json({
            message: 'Car reservation created successfully',
            data: newCarReservation
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const updateCarReservation = async (req, res) => {
    const {uuid} = req.params;
    const {
        car_id, 
        user_id,
        start_location,
        finish_location,
        description,
        driver_id, 
        start_date, 
        end_date,
        car_reservation_status_id,
        sequence
    } = req.body;

    try {
        const carReservation = await carReservationModel.findOne({
            where: {
                uuid
            }
        });

        if (!carReservation) {
            return res.status(404).json({
                message: 'Car reservation not found'
            });
        }

        let status_id = carReservation.car_reservation_status_id;

        if(car_reservation_status_id){
            status_id = car_reservation_status_id;
        }

        if(sequence){
            const status = await carReservationStatusModel.findOne({
                where:{
                    sequence
                }
            })

            status_id = status.id
        }

        carReservation.car_id = car_id || carReservation.car_id;
        carReservation.user_id = user_id || carReservation.user_id;
        carReservation.start_location = start_location || carReservation.start_location;
        carReservation.finish_location = finish_location || carReservation.finish_location;
        carReservation.description = description || carReservation.description;
        carReservation.driver_id = driver_id || carReservation.driver_id;
        carReservation.start_date = start_date || carReservation.start_date;
        carReservation.end_date = end_date || carReservation.end_date;
        carReservation.car_reservation_status_id = status_id;

        await carReservation.save();

        await createHistory({
            car_reservation_id:carReservation.id, 
            user_name:req.user.name, 
            description:'update reservation'
        })

        return res.status(200).json({
            message: 'Car reservation updated successfully',
            data: carReservation
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const deleteCarReservation = async (req, res) => {
    const {uuid} = req.params;
    const {permanent} = req.query;

    try {
        const carReservation = await carReservationModel.findOne({
            where: {
                uuid
            }
        });

        if (!carReservation) {
            return res.status(404).json({
                message: 'Car reservation not found'
            });
        }

        if(permanent){
            const value = Number(permanent)
            const boolean_value = Boolean(value)

            if(boolean_value){
                await carReservation.destroy();

                return res.status(200).json({
                    message: 'Car reservation permanent deleted successfully'
                });
            }else{
                carReservation.is_delete = boolean_value;

                await carReservation.save();

                return res.status(200).json({
                    message: 'Car reservation deleted successfully'
                });
            }
        }

        carReservation.is_delete = 0;

        await carReservation.save();

        return res.status(200).json({
            message: 'Car reservation deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getCarReservations,
    createCarReservation,
    getCarReservationByUuid,
    updateCarReservation,
    deleteCarReservation
};
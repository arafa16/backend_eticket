const {
    car_reservation_history:carReservationHistoryModel
} = require('../models');

const createCarReservationHistory = async (datas) => {
    const {car_reservation_id, user_name, description} = datas;

    try {
        const newHistory = await carReservationHistoryModel.create({
            car_reservation_id,
            user_name,
            description
        });

        return newHistory
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = {
    createCarReservationHistory,
};
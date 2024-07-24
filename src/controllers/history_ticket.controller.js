const {history_ticket:historyTicketModel} = require('../models');

const createHistory = async(data) => {
    await historyTicketModel.create({
        ticket_id:data.ticket_id,
        description:data.description,
        user_id:data.user_id
    })
}

module.exports = {
    createHistory
}
const {ticket: ticket_model} = require('../models');

const getTickets = async(req, res) => {
    const {uuid, code, year, name, code_ticket, sort} = req.query;

    const queryObject = {};
    let sortList = {};

    if(uuid){
        queryObject.uuid = uuid
    }

    if(name){
        queryObject.name = name
    }

    if(code_ticket){
        queryObject.code_ticket = code_ticket
    }

    if(code){
        queryObject.code = code
    }

    if(year){
        queryObject.year = year
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    if(sort){
        sortList = sort;
    }else{
        sortList ='code';
    }

    const result = await ticket_model.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[sortList]
    });

    return res.status(200).json({
        message: 'success',
        data: result
    })
}

module.exports = {
    getTickets
}

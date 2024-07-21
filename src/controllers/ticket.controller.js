const { where } = require('sequelize');
const {
    ticket: ticketModel, 
    status_ticket: statusTicketModel, 
    user: userModel,
    type_ticket: typeTicketModel
} = require('../models');

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

    const result = await ticketModel.findAndCountAll({
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

const createTicket = async(req, res) => {
    const {user_uuid, executor_uuid, description, status_ticket_uuid, type_ticket_uuid} = req.body;

    if(!user_uuid || !description || !status_ticket_uuid || !type_ticket_uuid){
        return res.status(401).jso({
            message: "field can't null"
        })
    }

    const user = await userModel.findOne({
        where:{
            uuid:user_uuid
        }
    });

    if(!user){
        return res.status(404).jso({
            message: "user not found"
        })
    }

    const executor = await userModel.findOne({
        where:{
            uuid:executor_uuid
        }
    });

    if(!executor){
        return res.status(404).jso({
            message: "executor not found"
        })
    }

    const status_ticket = await statusTicketModel.findOne({
        where:{
            uuid:status_ticket_uuid
        }
    })

    if(!status_ticket){
        return res.status(404).jso({
            message: "status ticket not found"
        })
    }

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid:type_ticket_uuid
        }
    })

    if(!type_ticket){
        return res.status(404).jso({
            message: "type ticket not found"
        })
    }

    const date = new Date();
    const year = date.getFullYear();


    const findTicket = await ticketModel.findAndCountAll({
        where:{
            year
        }
    });

    console.log(findTicket.count, 'findTicket');


    const code = Number(findTicket.count) + 1

    const code_ticket = `T${code}${year}`;
    
    const result = await ticketModel.create({
        user_id:user.id,
        date,
        code,
        year,
        code_ticket,
        description:description,
        status_ticket_id:status_ticket.id,
        type_id:type_ticket.id,
        executor_id:executor.id
    })

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const updateTicket = async(req, res) => {
    const {uuid} = req.params;
    const {user_uuid, executor_uuid, description, status_ticket_uuid, type_ticket_uuid, date, code, year, code_ticket} = req.body;

    const ticket = await ticketModel.findOne({
        where:{
            uuid
        }
    });

    if(!ticket){
        return res.status(404).json({
            message:"ticket not found"
        })
    }

    const user = await userModel.findOne({
        where:{
            uuid:user_uuid
        }
    });

    if(!user){
        return res.status(404).jso({
            message: "user not found"
        })
    }

    const executor = await userModel.findOne({
        where:{
            uuid:executor_uuid
        }
    });

    if(!executor){
        return res.status(404).jso({
            message: "executor not found"
        })
    }

    const status_ticket = await statusTicketModel.findOne({
        where:{
            uuid:status_ticket_uuid
        }
    })

    if(!status_ticket){
        return res.status(404).jso({
            message: "status ticket not found"
        })
    }

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid:type_ticket_uuid
        }
    })

    if(!type_ticket){
        return res.status(404).jso({
            message: "type ticket not found"
        })
    }
    
    const result = await ticket.update({
        user_id:user.id,
        date,
        code,
        year,
        code_ticket,
        description:description,
        status_ticket_id:status_ticket.id,
        type_ticket_id:type_ticket.id,
        executor_id:executor.id
    })

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const deleteTicket = async(req, res) => {
    const {uuid} = req.params;

    const ticket = await ticketModel.findOne({
        where:{
            uuid
        }
    });

    if(!ticket){
        return res.status(404).json({
            message: "ticket not found"
        })
    }

    await ticket.update({
        is_delete:true
    });

    return res.status(201).json({
        message: "delete ticket success"
    })
}

const hardDeleteTicket = async(req, res) => {
    const {uuid} = req.params;

    const ticket = await ticketModel.findOne({
        where:{
            uuid
        }
    });

    if(!ticket){
        return res.status(404).json({
            message: "ticket not found"
        })
    }

    const result = await ticket.destroy();

    return res.status(201).json({
        message: "delete ticket from database success",
        data:result
    })
}

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    hardDeleteTicket
}

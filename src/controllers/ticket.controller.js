const {
    ticket: ticketModel, 
    status_ticket: statusTicketModel, 
    user: userModel,
    type_ticket: typeTicketModel
} = require('../models');

const {createHistory} = require('./history_ticket.controller');

const getTickets = async(req, res) => {
    const {uuid, code, year, name, code_ticket, sort, is_delete} = req.query;

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

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
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
    const {executor_uuid, description, status_ticket_uuid, type_ticket_uuid} = req.body;

    let executor_id = ''

    if(!description || !status_ticket_uuid || !type_ticket_uuid){
        return res.status(401).jso({
            message: "field can't null"
        })
    }

    const user = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });


    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    if(!executor_uuid){
        executor_id=null;
    }else{
        const executor = await userModel.findOne({
            where:{
                uuid:executor_uuid
            }
        });

        if(!executor){
            return res.status(404).json({
                message: "executor not found"
            })
        }

        executor_id=executor.id;
    }

    const status_ticket = await statusTicketModel.findOne({
        where:{
            uuid:status_ticket_uuid
        }
    })

    if(!status_ticket){
        return res.status(404).json({
            message: "status ticket not found"
        })
    }

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid:type_ticket_uuid
        }
    })

    if(!type_ticket){
        return res.status(404).json({
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


    const code = Number(findTicket.count) + 1;

    const code_ticket = `T${code}${year}`;
    
    const result = await ticketModel.create({
        user_id:user.id,
        date,
        code,
        year,
        code_ticket,
        description:description,
        status_ticket_id:status_ticket.id,
        type_ticket_id:type_ticket.id,
        executor_id
    })

    createHistory({
        ticket_id:result.id,
        user_id:user.id,
        description:'create ticket'
    });

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const updateTicket = async(req, res) => {
    const {uuid} = req.params;
    const {executor_uuid, description, status_ticket_uuid, type_ticket_uuid, date, code, year, code_ticket} = req.body;

    let executor_id = ''

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
            uuid:req.user.uuid
        }
    });

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    if(!executor_uuid){
        executor_id=null;
    }else{
        const executor = await userModel.findOne({
            where:{
                uuid:executor_uuid
            }
        });

        if(!executor){
            return res.status(404).json({
                message: "executor not found"
            })
        }

        executor_id=executor.id;
    }

    const status_ticket = await statusTicketModel.findOne({
        where:{
            uuid:status_ticket_uuid
        }
    })

    if(!status_ticket){
        return res.status(404).json({
            message: "status ticket not found"
        })
    }

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid:type_ticket_uuid
        }
    })

    if(!type_ticket){
        return res.status(404).json({
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
        executor_id
    })

    createHistory({
        ticket_id:result.id,
        user_id:user.id,
        description:'update ticket'
    });

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

    const user = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    await ticket.update({
        is_delete:true
    });

    createHistory({
        ticket_id:ticket.id,
        user_id:user.id,
        description:'update ticket'
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

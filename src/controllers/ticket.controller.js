const { Op, where } = require('sequelize');
const {
    ticket: ticketModel, 
    status_ticket: statusTicketModel, 
    user: userModel,
    type_ticket: typeTicketModel,
    devisi: devisiModel,
    penempatan: penempatanModel,
    history_ticket: historyTicketModel,
    attachment_ticket: attachmentTicketModal
} = require('../models');

const {createHistory} = require('./history_ticket.controller');

const getTickets = async(req, res) => {
    const {uuid, code, year, name, code_ticket, sort, is_delete, search} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    const querySearchUser = {};

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

    const notStatus = req.query.notStatus.split(',');

    if(notStatus){
        queryObject.status_ticket_id = {
            [Op.not]:notStatus
        }
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    if(sort){
        sortList = sort;
    }else{
        sortList ='code';
    }

    if(search !== null){
        querySearchObject.code = {[Op.like]:`%${search}%`}
        querySearchObject.year = {[Op.like]:`%${search}%`}
        querySearchObject.code_ticket = {[Op.like]:`%${search}%`}
    }

    const result = await ticketModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}
        ],
        limit,
        offset,
        order:[sortList],
        include:[
            {
                as:'user',
                model:userModel,
                include:[
                    {
                        model:devisiModel
                    },
                    {
                        model:penempatanModel
                    }
                ]
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                model:typeTicketModel
            },
            {
                model:statusTicketModel
            },
        ],
        order:[
            ['date','DESC']
        ]
    });

    return res.status(200).json({
        message: 'success',
        data: result
    })
}

const getCountTickets = async(req, res) => {
    const {uuid_user, uuid_pic} = req.query;

    const queryObject = {};

    if(uuid_user){
        const user = await userModel.findOne({
            where:{
                uuid:uuid_user
            }
        });

        queryObject.user_id = user.id
    }

    if(uuid_pic){
        const user = await userModel.findOne({
            where:{
                uuid:uuid_pic
            }
        });

        if(user !== null){
            queryObject.executor_id = user.id
        }
    }

    const draft = await ticketModel.count({
        where:[
            queryObject,
            {
            status_ticket_id:1,
            is_delete:0
            }
        ]
    });

    const pengajuan = await ticketModel.count({
        where:[
            queryObject,
            {
            status_ticket_id:2,
            is_delete:0
            }
        ]
    });

    const process = await ticketModel.count({
        where:[
            queryObject,
            {
            status_ticket_id:3,
            is_delete:0
            }
        ]
    });

    const done = await ticketModel.count({
        where:[
            queryObject,
            {
            status_ticket_id:4,
            is_delete:0
            }
        ]
    });

    const cancel = await ticketModel.count({
        where:[
            queryObject,
            {
            status_ticket_id:5,
            is_delete:0
            }
        ]
    });

    const all = await ticketModel.count({
        where:[
            queryObject
        ]
    });

    return res.status(200).json({
        message: 'success',
        data: {
            draft, pengajuan, process, done, cancel, all
        }
    })
}

const getTicketById = async(req, res) => {

    const {uuid} = req.query;

    const queryObject = {};

    if(uuid){
        queryObject.uuid = uuid
    }

    const result = await ticketModel.findOne({
        where:queryObject,
        include:[
            {
                as:'user',
                model:userModel,
                include:[
                    {
                        model:devisiModel
                    },
                    {
                        model:penempatanModel
                    }
                ]
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                model:typeTicketModel
            },
            {
                model:statusTicketModel
            },
            {
                model:attachmentTicketModal
            }
        ]
    });

    const history = await historyTicketModel.findAll({
        where:{
            ticket_id:result.id
        },
        order: [
            ['created_at', 'DESC']
        ],
        include:[
            {
                model:userModel
            }
        ],
    });

    return res.status(200).json({
        message: 'success',
        data:result, 
        history
    });
}

const getTicketByUser = async(req, res) => {
    const {uuid, search, is_delete} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    const querySearchUser = {};

    const user = await userModel.findOne({
        where:{
            uuid
        }
    })

    // let deleteValue = 0;

    // if(is_delete !== undefined){
    //     deleteValue = is_delete
    // }else{
    //     deleteValue = 0;
    // }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;
    const notStatus = req.query.notStatus.split(',');

    if(user){
        queryObject.user_id = user.id
    }

    if(notStatus){
        queryObject.status_ticket_id = {
            [Op.not]:notStatus
        }
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
    }

    if(search !== null){
        querySearchObject.code = {[Op.like]:`%${search}%`}
        querySearchObject.year = {[Op.like]:`%${search}%`}
        querySearchObject.code_ticket = {[Op.like]:`%${search}%`}
    }

    const result = await ticketModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}
        ],
        include:[
            {
                model:typeTicketModel
            },
            {
                model:statusTicketModel
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                as:'user',
                model:userModel,
            }
        ],
        limit,
        offset,
        order:[
            ['date','DESC']
        ]
    });

    return res.status(200).json({
        message: 'success bro',
        data: result
    })
}

const getTicketByPic = async(req, res) => {
    const {uuid, search, is_delete} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    const querySearchUser = {};

    const user = await userModel.findOne({
        where:{
            uuid:uuid
        }
    });

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;
    const notStatus = req.query.notStatus.split(',');

    if(user){
        queryObject.executor_id = user.id
    }

    if(notStatus){
        queryObject.status_ticket_id = {
            [Op.not]:notStatus
        }
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
    }

    if(search !== null){
        querySearchObject.code = {[Op.like]:`%${search}%`}
        querySearchObject.year = {[Op.like]:`%${search}%`}
        querySearchObject.code_ticket = {[Op.like]:`%${search}%`}
    }

    const result = await ticketModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}
        ],
        include:[
            {
                model:typeTicketModel
            },
            {
                model:statusTicketModel
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                as:'user',
                model:userModel,
            }
        ],
        limit,
        offset,
        order:[
            ['date','DESC']
        ]
    });

    return res.status(200).json({
        message: 'success bro',
        data: result
    })
}

const createTicket = async(req, res) => {
    const {user_uuid, executor_uuid, description, status_ticket_uuid, type_ticket_uuid} = req.body;
    
    let executor_id = ''
    let user_id = ''

    if(!description || !status_ticket_uuid || !type_ticket_uuid){
        return res.status(401).jso({
            message: "field can't null"
        })
    }

    if(!user_uuid){
        const user = await userModel.findOne({
            where:{
                uuid:req.user.uuid
            }
        });

        user_id = user.id
    }else{
        const user = await userModel.findOne({
            where:{
                uuid:user_uuid
            }
        });

        user_id = user.id
    }

    console.log(user_id, 'user_id')

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


    const code = Number(findTicket.count) + 1;

    const code_ticket = `T${code}${year}`;
    
    const result = await ticketModel.create({
        user_id:user_id,
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
        user_id:user_id,
        description:'create ticket'
    });

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const updateTicket = async(req, res) => {
    const {uuid} = req.params;
    const {user_uuid, executor_uuid, description, type_ticket_uuid} = req.body;

    let executor_id = ''

    const userLogin = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });

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
        description:description,
        type_ticket_id:type_ticket.id,
        executor_id
    })

    createHistory({
        ticket_id:result.id,
        user_id:userLogin.id,
        description:'edit ticket'
    });

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const updateStatusTicket = async(req, res) => {
    const {uuid} = req.params;
    const {status_ticket_uuid} = req.body;

    const user = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });

    if(!user){
        return res.status(404).json({
            message: "please login again"
        })
    }

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

    const result = await ticket.update({
        status_ticket_id:status_ticket.id,
    })

    createHistory({
        ticket_id:result.id,
        user_id:user.id,
        description:`update status to ${status_ticket.name}`
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
    getCountTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    hardDeleteTicket,
    getTicketByUser,
    getTicketByPic,
    updateStatusTicket
}

const {status_ticket: statusTicketModel} = require('../models')

const getStatusTickets = async(req, res) => {

    const result = await statusTicketModel.findAll();
    
    return res.status(200).json({
        message:"success",
        data:result
    })
}

const getStatusTicketsTable = async(req, res) => {
    const {uuid, name, sort, is_delete} = req.query;

    const queryObject = {};
    let sortList = {};

    if(uuid){
        queryObject.uuid = uuid
    }

    if(name){
        queryObject.name = name
    }

    if(sort){
        sortList = sort;
    }else{
        sortList ='id';
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    const result = await statusTicketModel.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[sortList]
    });
    
    return res.status(200).json({
        message:"success",
        data:result
    })
}

const getStatusTicketSelect = async(req, res) => {
    
    const result = await statusTicketModel.findAll({
        where:{
            is_select:true,
            is_delete:false
        }
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const getStatusTicketById = async(req, res) => {
    
    const result = await statusTicketModel.findOne({
        where:{
            uuid:req.params.uuid
        }
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const getStatusTicketByCode = async(req, res) => {
    console.log(req.params.code, 'code')
    const result = await statusTicketModel.findOne({
        where:{
            sequence:req.params.code
        }
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const createStatusTicket = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await statusTicketModel.create({
       name,
       sequence,
       is_select,
       is_active
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const updateStatusTicket = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const status_ticket = await statusTicketModel.findOne({
        where:{
            uuid
        }
    })

    if(!status_ticket){
        return res.status(404).json({
            message:"not found"
        })
    }

    const result = await status_ticket.update({
       name,
       sequence,
       is_select,
       is_active
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const deleteStatusTicket = async(req, res) => {
    const {uuid} = req.params;

    const statusTicket = await statusTicketModel.findOne({
        where:{
            uuid
        }
    });

    if(!statusTicket){
        return res.status(404).json({
            message:"status ticket not found"
        })
    }

    const result = await statusTicket.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteStatusTicket = async(req, res) => {
    const {uuid} = req.params;

    const statusTicket = await statusTicketModel.findOne({
        where:{
            uuid
        }
    });

    if(!statusTicket){
        return res.status(404).json({
            message:"status ticket not found"
        })
    }

    const result = await statusTicket.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getStatusTickets,
    getStatusTicketsTable,
    getStatusTicketSelect,
    getStatusTicketById,
    getStatusTicketByCode,
    createStatusTicket,
    updateStatusTicket,
    deleteStatusTicket,
    hardDeleteStatusTicket
}
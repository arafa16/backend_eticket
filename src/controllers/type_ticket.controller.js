const {type_ticket:typeTicketModel} = require('../models');

const getTypeTickets = async(req, res) => {
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

    const type_ticket = await typeTicketModel.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[sortList]
    });

    return res.status(200).json({
        message:'success',
        data:type_ticket
    })
}

const getTypeTicketsSelect = async(req, res) => {
    
    const type_ticket = await typeTicketModel.findAll({
        where:{
            is_select:true,
            is_delete:false
        }
    });

    return res.status(200).json({
        message:'success',
        data:type_ticket
    })
}

const getTypeTicketByUuid = async(req, res) => {
    const {uuid} = req.params;

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid
        }
    });

    if(!type_ticket){
        return res.status(404).json({
            message:"type ticket not found"
        })
    }

    return res.status(200).json({
        message:'success',
        data:type_ticket
    })
}

const createTypeTicket = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    console.log(name, sequence, is_select, is_active, 'value');

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await typeTicketModel.create({
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

const updateTypeTicket = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active, is_delete} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid
        }
    })

    if(!type_ticket){
        return res.status(404).json({
            message:"type ticket not found"
        })
    }

    const result = await type_ticket.update({
        name,
        sequence,
        is_select,
        is_active,
        is_delete
     });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const deleteTypeTicket = async(req, res) => {
    const {uuid} = req.params;

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid
        }
    });

    if(!type_ticket){
        return res.status(404).json({
            message:"type ticket not found"
        })
    }

    const result = await type_ticket.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteTypeTicket = async(req, res) => {
    const {uuid} = req.params;

    const type_ticket = await typeTicketModel.findOne({
        where:{
            uuid
        }
    });

    if(!type_ticket){
        return res.status(404).json({
            message:"type ticket not found"
        })
    }

    const result = await type_ticket.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getTypeTickets,
    getTypeTicketsSelect,
    getTypeTicketByUuid,
    createTypeTicket,
    updateTypeTicket,
    deleteTypeTicket,
    hardDeleteTypeTicket
}
const { where } = require('sequelize');
const {
    note_ticket:noteTicketModel, 
    ticket:ticketModel,
    status_note:statusNoteModel,
    user:userModel,
} = require('../models');

const {createHistory} = require('./history_ticket.controller');

const getNoteTicketByTicket = async(req, res)=>{

    const {ticket_uuid, sort, is_delete} = req.query;
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    const queryObject = {};
    let sortList = {};
    

    const ticket = await ticketModel.findOne({
        where:{
            uuid:ticket_uuid
        }
    });

    if(!ticket){
        return res.status(404).json({
            message:"ticket not found"
        })
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = false;
    }

    if(ticket){
        queryObject.ticket_id = ticket.id
    }

    if(sort){
        sortList = sort;
    }else{
        sortList ='created_at';
    }

    const result = await noteTicketModel.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[[sortList, 'DESC']],
        include:[
            {
                model:statusNoteModel
            }
        ]
    })

    return res.status(200).json({
        message:"success",
        data:result
    })
}

const createNoteTicket = async(req, res)=>{
    const {ticket_uuid, user_uuid, description, status_note_uuid} = req.body;

    let status_note_id = '';
    let status_note_name = null;

    const user = await userModel.findOne({
        where:{
            uuid:user_uuid
        }
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const ticket = await ticketModel.findOne({
        where:{
            uuid:ticket_uuid
        }
    });

    if(!ticket){
        return res.status(404).json({
            message:"ticket not found"
        })
    }

    if(!status_note_uuid){
        status_note_id = 1;
        status_note_name = 'draft';
    }else{
        const status_note = await statusNoteModel.findOne({
            where:{
                uuid:status_note_uuid
            }
        });

        status_note_id = status_note.id
        status_note_name = status_note.name
    }

    const result = await noteTicketModel.create({
        ticket_id:ticket.id,
        user_id:user.id,
        description,
        status_note_id
    })

    createHistory({
        ticket_id:ticket.id,
        user_id:user.id,
        description: 'create note (' + description + `) : set status to ${status_note_name}`
    });

    return res.status(201).json({
        message:"success",
        data:result
    })
}

const updateNoteTicket = async(req, res)=>{
    const {uuid} = req.params;

    const {ticket_uuid, user_uuid, description, status_note_uuid} = req.body;

    const note_ticket = await noteTicketModel.findOne({
        where:{
            uuid
        }
    })

    if(!note_ticket){
        return res.status(404).json({
            message:"note ticket not found"
        })
    }

    const user = await userModel.findOne({
        where:{
            uuid:user_uuid
        }
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const ticket = await ticketModel.findOne({
        where:{
            uuid:ticket_uuid
        }
    });

    if(!ticket){
        return res.status(404).json({
            message:"ticket not found"
        })
    }

    const status_note = await statusNoteModel.findOne({
        where:{
            uuid:status_note_uuid
        }
    });

    if(!status_note){
        return res.status(404).json({
            message:"note ticket not found"
        })
    }

    const result = await note_ticket.update({
        ticket_id:ticket.id,
        user_id:user.id,
        description,
        status_note_id:status_note.id
    })

    createHistory({
        ticket_id:ticket.id,
        user_id:user.id,
        description: 'change note (' + description + `) : update status to ${status_note.name}`
    });

    return res.status(201).json({
        message:"success",
        data:result
    })
}

const deleteNoteTicket = async(req, res)=>{
    const {uuid} = req.params;

    const note_ticket = await noteTicketModel.findOne({
        where:{
            uuid
        }
    })

    if(!note_ticket){
        return res.status(404).json({
            message:"note ticket not found"
        })
    }
    const result = await note_ticket.update({
        is_delete:true
    })

    return res.status(201).json({
        message:"success deleted",
        data:result
    })
}

const hardDeleteNoteTicket = async(req, res)=>{
    const {uuid} = req.params;

    const note_ticket = await noteTicketModel.findOne({
        where:{
            uuid
        }
    })

    if(!note_ticket){
        return res.status(404).json({
            message:"note ticket not found"
        })
    }
    const result = await note_ticket.destroy();

    return res.status(201).json({
        message:"success",
        data:result
    })
}

module.exports = {
    getNoteTicketByTicket,
    createNoteTicket,
    updateNoteTicket,
    // updateStatusNoteTicket,
    deleteNoteTicket,
    hardDeleteNoteTicket
}
const { where } = require('sequelize');
const {
    note_ticket:noteTicketModel, 
    ticket:ticketModel,
    status_note:statusNoteModel,
    user:userModel
} = require('../models');

const createNoteTicket = async(req, res)=>{
    const {ticket_uuid, user_uuid, description, status_note_uuid} = req.body;

    let status_note_id = '';

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
    }else{
        const status_note = await statusNoteModel.findOne({
            where:{
                uuid:status_note_uuid
            }
        });

        status_note_id = status_note.id
    }

    const result = await noteTicketModel.create({
        ticket_id:ticket.id,
        user_id:user.id,
        description,
        status_note_id
    })

    return res.status(201).json({
        message:"success",
        data:result
    })
}

const updateNoteTicket = async(req, res)=>{
    const {uuid} = req.params;

    const {ticket_uuid, user_uuid, description, status_note_uuid} = req.body;

    let status_note_id = '';

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

    if(!status_note_uuid){
        status_note_id = 1;
    }else{
        const status_note = await statusNoteModel.findOne({
            where:{
                uuid:status_note_uuid
            }
        });

        status_note_id = status_note.id
    }

    const result = await note_ticket.update({
        ticket_id:ticket.id,
        user_id:user.id,
        description,
        status_note_id
    })

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
        message:"success",
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
    createNoteTicket,
    updateNoteTicket,
    deleteNoteTicket,
    hardDeleteNoteTicket
}
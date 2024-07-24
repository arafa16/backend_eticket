const {status_note: statusNoteModel} = require('../models')

const getStatusNotes = async(req, res) => {
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

    const result = await statusNoteModel.findAndCountAll({
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

const getStatusNoteSelect = async(req, res) => {
    
    const result = await statusNoteModel.findAll({
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

const getStatusNoteById = async(req, res) => {
    
    const result = await statusNoteModel.findAll({
        where:{
            uuid:req.params.uuid
        }
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const createStatusNote = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await statusNoteModel.create({
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

const updateStatusNote = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const status_note = await statusNoteModel.findOne({
        where:{
            uuid
        }
    })

    if(!status_note){
        return res.status(404).json({
            message:"not found"
        })
    }

    const result = await status_note.update({
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

const deleteStatusNote = async(req, res) => {
    const {uuid} = req.params;

    const statusNote = await statusNoteModel.findOne({
        where:{
            uuid
        }
    });

    if(!statusNote){
        return res.status(404).json({
            message:"status note not found"
        })
    }

    const result = await statusNote.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteStatusNote = async(req, res) => {
    const {uuid} = req.params;

    const statusNote = await statusNoteModel.findOne({
        where:{
            uuid
        }
    });

    if(!statusNote){
        return res.status(404).json({
            message:"status note not found"
        })
    }

    const result = await statusNote.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getStatusNotes,
    getStatusNoteSelect,
    getStatusNoteById,
    createStatusNote,
    updateStatusNote,
    deleteStatusNote,
    hardDeleteStatusNote
}
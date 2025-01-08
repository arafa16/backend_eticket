const {project_note_status:projectNoteStatusModel} = require('../models');

const getDatas = async(req, res) => {
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

    const result = await projectNoteStatusModel.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[sortList]
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const getDataSelect = async(req, res) => {
    
    const result = await projectNoteStatusModel.findAll({
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

const getDataByUuid = async(req, res) => {
    const {uuid} = req.params;

    const result = await projectNoteStatusModel.findOne({
        where:{
            uuid
        }
    });

    if(!result){
        return res.status(404).json({
            message:"data not found"
        })
    }

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const createData = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await projectNoteStatusModel.create({
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

const updateData = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active, is_delete} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const findData = await projectNoteStatusModel.findOne({
        where:{
            uuid
        }
    })

    if(!findData){
        return res.status(404).json({
            message:"data not found"
        })
    }

    const result = await findData.update({
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

const deleteData = async(req, res) => {
    const {uuid} = req.params;

    const findData = await projectNoteStatusModel.findOne({
        where:{
            uuid
        }
    });

    if(!findData){
        return res.status(404).json({
            message:"data not found"
        })
    }

    const result = await findData.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteData = async(req, res) => {
    const {uuid} = req.params;

    const findData = await projectNoteStatusModel.findOne({
        where:{
            uuid
        }
    });

    if(!findData){
        return res.status(404).json({
            message:"data not found"
        })
    }

    const result = await findData.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getDatas,
    getDataSelect,
    getDataByUuid,
    createData,
    updateData,
    deleteData,
    hardDeleteData
}
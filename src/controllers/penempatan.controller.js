const {penempatan:penempatanModel} = require('../models');

const getPenenpatans = async(req, res) => {
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

    const result = await penempatanModel.findAndCountAll({
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

const getPenenpatanSelect = async(req, res) => {
    
    const result = await penempatanModel.findAll({
        where:{
            is_select:true
        }
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const getPenempatanByUuid = async(req, res) => {
    const {uuid} = req.params;

    const result = await penempatanModel.findOne({
        where:{
            uuid
        }
    });

    if(!result){
        return res.status(404).json({
            message:"penempatan not found"
        })
    }

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const createPenenpatan = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await penempatanModel.create({
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

const updatePenempatan = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active, is_delete} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const penempatan = await penempatanModel.findOne({
        where:{
            uuid
        }
    })

    if(!penempatan){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    const result = await penempatan.update({
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

const deletePenempatan = async(req, res) => {
    const {uuid} = req.params;

    const penempatan = await penempatanModel.findOne({
        where:{
            uuid
        }
    });

    if(!penempatan){
        return res.status(404).json({
            message:"penempatan not found"
        })
    }

    const result = await penempatan.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeletePenempatan = async(req, res) => {
    const {uuid} = req.params;

    const penempatan = await penempatanModel.findOne({
        where:{
            uuid
        }
    });

    if(!penempatan){
        return res.status(404).json({
            message:"penempatan not found"
        })
    }

    const result = await penempatan.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getPenenpatans,
    getPenenpatanSelect,
    getPenempatanByUuid,
    createPenenpatan,
    updatePenempatan,
    deletePenempatan,
    hardDeletePenempatan
}

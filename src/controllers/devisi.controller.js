const {devisi:devisiModel} = require('../models');

const getDevisis = async(req, res) => {
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

    const devisi = await devisiModel.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[sortList]
    });

    return res.status(200).json({
        message:'success',
        data:devisi
    })
}

const getDevisisSelect = async(req, res) => {
    
    const devisi = await devisiModel.findAll({
        where:{
            is_select:true
        }
    });

    return res.status(200).json({
        message:'success',
        data:devisi
    })
}

const getDevisiByUuid = async(req, res) => {
    const {uuid} = req.params;

    const devisi = await devisiModel.findOne({
        where:{
            uuid
        }
    });

    if(!devisi){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    return res.status(200).json({
        message:'success',
        data:devisi
    })
}

const createDevisi = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await devisiModel.create({
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

const updateDevisi = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active, is_delete} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const devisi = await devisiModel.findOne({
        where:{
            uuid
        }
    })

    if(!devisi){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    const result = await devisi.update({
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

const deleteDevisi = async(req, res) => {
    const {uuid} = req.params;

    const devisi = await devisiModel.findOne({
        where:{
            uuid
        }
    });

    if(!devisi){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    const result = await devisi.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteDevisi = async(req, res) => {
    const {uuid} = req.params;

    const devisi = await devisiModel.findOne({
        where:{
            uuid
        }
    });

    if(!devisi){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    const result = await devisi.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getDevisis,
    getDevisisSelect,
    getDevisiByUuid,
    createDevisi,
    updateDevisi,
    deleteDevisi,
    hardDeleteDevisi
}
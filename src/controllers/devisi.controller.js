const { where } = require('sequelize');
const {devisi:devisiModel} = require('../models');

const getDevisis = async(req, res) => {

    const devisi = await devisiModel.findAll();

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
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
    deleteDevisi,
    hardDeleteDevisi
}
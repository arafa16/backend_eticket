const { Op, where } = require('sequelize');
const {
    user : userModel, 
    status_user: statusUserModel, 
    penempatan: penempatanModel,
    devisi: devisiModel
} = require('../models');

const getUsers = async(req, res) => {
    const {uuid, name, email, sort} = req.query;

    const queryObject = {};
    let sortList = {};

    if(uuid){
        queryObject.uuid = uuid
    }

    if(name){
        queryObject.name = name
    }

    if(email){
        queryObject.email = email
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    if(sort){
        sortList = sort;
    }else{
        sortList ='name';
    }
    
    const result = await userModel.findAndCountAll({
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

module.exports = {
    getUsers
}
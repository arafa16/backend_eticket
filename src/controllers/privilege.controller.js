const {privilege : privilegeModel, user: userModel} = require('../models');

const getById = async(req, res)=>{
    const {uuid} = req.params;

    const privilege = await privilegeModel.findOne({
        where:{
            uuid
        }
    });

    if(!privilege){
        return res.status(404).json({
            message: "privilege not set"
        })
    }

    return res.status(200).json({
        message: "success",
        data:privilege
    })
}

const createById = async(req, res)=>{
    const {uuid} = req.params;
    const {dashboard, ticket_executor, ticket_requestor, entity, admin} = req.body;

    const privilege = await privilegeModel.findOne({
        where:{
            uuid
        }
    });

    if(privilege !== null){
        return res.status(404).json({
            message: "privilege is set"
        })
    }

    const result = await privilegeModel.create({
        dashboard,
        ticket_requestor,
        ticket_executor,
        entity,
        admin
    })

    return res.status(200).json({
        message: "success",
        data:result
    })
}

const updateById = async(req, res)=>{
    const {uuid} = req.params;
    const {dashboard, ticket_executor, ticket_requestor, entity, admin} = req.body;

    const privilege = await privilegeModel.findOne({
        where:{
            uuid
        }
    });

    if(!privilege){
        return res.status(404).json({
            message: "privilege not found"
        })
    }

    const result = await privilege.update({
        dashboard,
        ticket_requestor,
        ticket_executor,
        entity,
        admin
    })

    return res.status(200).json({
        message: "success",
        data:result
    })
}

const hardDeleteById = async(req, res)=>{
    const {uuid} = req.params;
    
    const privilege = await privilegeModel.findOne({
        where:{
            uuid
        }
    });

    if(!privilege){
        return res.status(404).json({
            message: "privilege not found"
        })
    }

    const result = await privilege.destroy();

    return res.status(200).json({
        message: "success",
        data:result
    })
}

module.exports = {
    getById,
    createById,
    updateById,
    hardDeleteById
}
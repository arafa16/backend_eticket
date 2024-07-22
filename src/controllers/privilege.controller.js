const {privilege : privilegeModel, user: userModel} = require('../models');

const getByUser = async(req, res)=>{
    const {name} = req.params;

    const privilege = await privilegeModel.findOne({
        where:{
            name
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

const createByUser = async(req, res)=>{
    const {name} = req.params;
    const {dashboard, ticket_executor, ticket_requestor, entity, admin} = req.body;

    const privilege = await privilegeModel.findOne({
        where:{
            name
        }
    });

    console.log(privilege, 'privilege')

    if(privilege !== null){
        return res.status(404).json({
            message: "privilege is set"
        })
    }

    const user = await userModel.findOne({
        where:{
            name
        }
    });

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const result = await privilegeModel.create({
        name,
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

const updateByUser = async(req, res)=>{
    const {name} = req.params;
    const {dashboard, ticket_executor, ticket_requestor, entity, admin} = req.body;

    const privilege = await privilegeModel.findOne({
        where:{
            name
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

const hardDeleteByUser = async(req, res)=>{
    const {name} = req.params;
    
    const privilege = await privilegeModel.findOne({
        where:{
            name
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
    getByUser,
    createByUser,
    updateByUser,
    hardDeleteByUser
}
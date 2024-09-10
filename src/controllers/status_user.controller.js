const {status_user: statusUserModel} = require('../models')

const getStatusUsers = async(req, res) => {
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

    const result = await statusUserModel.findAndCountAll({
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

const getStatusUserSelect = async(req, res) => {
    
    const result = await statusUserModel.findAll({
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

const getStatusUserById = async(req, res) => {
    
    const result = await statusUserModel.findOne({
        where:{
            uuid:req.params.uuid
        }
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const createStatusUser = async(req, res) => {
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const result = await statusUserModel.create({
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

const updateStatusUser = async(req, res) => {
    const {uuid} = req.params;
    const {name, sequence, is_select, is_active} = req.body; 

    if(!name || !sequence){
        return res.status(401).json({
            message:"name or sequence don't null"
        })
    }

    const status_user = await statusUserModel.findOne({
        where:{
            uuid
        }
    })

    if(!status_user){
        return res.status(404).json({
            message:"not found"
        })
    }

    const result = await status_user.update({
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

const deleteStatusUser = async(req, res) => {
    const {uuid} = req.params;

    const statusUser = await statusUserModel.findOne({
        where:{
            uuid
        }
    });

    if(!statusUser){
        return res.status(404).json({
            message:"status user not found"
        })
    }

    const result = await statusUser.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteStatusUser = async(req, res) => {
    const {uuid} = req.params;

    const statusUser = await statusUserModel.findOne({
        where:{
            uuid
        }
    });

    if(!statusUser){
        return res.status(404).json({
            message:"status user not found"
        })
    }

    const result = await statusUser.destroy();

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    getStatusUsers,
    getStatusUserSelect,
    getStatusUserById,
    createStatusUser,
    updateStatusUser,
    deleteStatusUser,
    hardDeleteStatusUser
}
const { Op } = require('sequelize');
const argon = require('argon2')

const {
    user : userModel, 
    status_user: statusUserModel, 
    penempatan: penempatanModel,
    devisi: devisiModel, 
    privilege: privilegeModel,
} = require('../models');

const getUsers = async(req, res) => {
    const {uuid, name, email, sort, is_delete} = req.query;

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

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
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

const createUser = async(req, res) => {
    const {name, email, password, nomor_hp, devisi_uuid, penempatan_uuid, status_user_uuid} = req.body;

    if(!name || !email || !password || !nomor_hp || !devisi_uuid || !penempatan_uuid || !status_user_uuid){
        return res.status(401).json({
            message:"field can't null"
        })
    }

    const findName = await userModel.findOne({
        where:{
            name
        }
    });

    if(findName !== null){
        return res.status(401).json({
            message:"user registered"
        });
    }
    
    const devisi = await devisiModel.findOne({
        where:{
            uuid:devisi_uuid
        }
    });

    if(!devisi){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    const penempatan = await penempatanModel.findOne({
        where:{
            uuid:penempatan_uuid
        }
    });

    if(!penempatan){
        return res.status(404).json({
            message:"penempatan not found"
        })
    }

    const status_user = await statusUserModel.findOne({
        where:{
            uuid:status_user_uuid
        }
    });

    if(!status_user){
        return res.status(404).json({
            message:"status user not found"
        })
    }

    const result = await userModel.create({
        name,
        email,
        password,
        nomor_hp,
        devisi_id:devisi.id,
        penempatan_id:penempatan.id,
        status_user_id:status_user.id
    });

    res.status(201).json({
        message: 'success',
        data: result
    });
}

const updateUser = async(req, res) => {
    const {uuid} = req.params;
    const {name, email, nomor_hp, devisi_uuid, penempatan_uuid, status_user_uuid} = req.body;

    const user = await userModel.findOne({
        where:{
            uuid
        }
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    if(!name || !email || !nomor_hp || !devisi_uuid || !penempatan_uuid || !status_user_uuid){
        return res.status(401).json({
            message:"field can't null"
        })
    }
    
    const devisi = await devisiModel.findOne({
        where:{
            uuid:devisi_uuid
        }
    });

    if(!devisi){
        return res.status(404).json({
            message:"devisi not found"
        })
    }

    const penempatan = await penempatanModel.findOne({
        where:{
            uuid:penempatan_uuid
        }
    });

    if(!penempatan){
        return res.status(404).json({
            message:"penempatan not found"
        })
    }

    const status_user = await statusUserModel.findOne({
        where:{
            uuid:status_user_uuid
        }
    });

    if(!status_user){
        return res.status(404).json({
            message:"status user not found"
        })
    }

    const result = await user.update({
        name,
        email,
        nomor_hp,
        devisi_id:devisi.id,
        penempatan_id:penempatan.id,
        status_user_id:status_user.id
    });

    res.status(201).json({
        message: 'success',
        data: result
    });
}

const updatePassword = async(req, res) => {
    const {uuid} = req.params;
    const {password} = req.body;

    const user = await userModel.findOne({
        where:{
            uuid
        }
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    if(!password){
        return res.status(401).json({
            message:"field can't null"
        })
    }

    const hasPassword = await argon.hash(password);

    const result = await user.update({
        password:hasPassword
    });

    res.status(201).json({
        message: 'success',
        data: result
    });
}

const deleteUser = async(req, res) => {
    const {uuid} = req.params;

    const result = await userModel.findOne({
        where:{
            uuid:uuid,
            is_delete:false
        }
    });

    if(!result){
        return res.status(404).json({
            message:"user not found"
        })
    }

    result.update({
        is_delete:true
    });

    return res.status(200).json({
        message:'success',
        data:result
    })
}

const hardDeleteUser = async(req, res) => {
    const {uuid} = req.params;

    const result = await userModel.findOne({
        where:{
            uuid:uuid
        }
    });

    if(!result){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const privilege = await privilegeModel.findOne({
        where:{
            name:result.name
        }
    });

    if(privilege !== null){
        privilege.destroy();
    }

    const response = await result.destroy();

    return res.status(200).json({
        message:'success',
        data:response
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    updatePassword,
    deleteUser,
    hardDeleteUser
}
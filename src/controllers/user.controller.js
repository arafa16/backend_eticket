const argon = require('argon2');
const path = require('path');
const crypto = require('crypto');

const {
    user : userModel, 
    status_user: statusUserModel, 
    penempatan: penempatanModel,
    devisi: devisiModel, 
    privilege: privilegeModel,
} = require('../models');
const { Op } = require('sequelize');

const getUsers = async(req, res) => {
    const {uuid, search, sort, is_delete} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    let sortList = {};


    if(uuid){
        queryObject.uuid = uuid
    }

    if(search !== null){
        querySearchObject.name = {[Op.like]:`%${search}%`}
        querySearchObject.email = {[Op.like]:`%${search}%`}
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
        queryObject.is_delete = false
    }
    
    const result = await userModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}],
        limit,
        offset,
        include:[
            {
                model:penempatanModel
            },
            {
                model:statusUserModel
            }
        ],
        order:[sortList]
    });

    console.log(queryObject, 'queryObject')


    return res.status(200).json({
        message:"success",
        data:result
    })

}

const getUserById = async(req, res) => {
    const {uuid} = req.params;

    const result = await userModel.findOne({
        where:{
            uuid
        },
        include:[
            {
                model:penempatanModel
            },
            {
                model:statusUserModel
            },
            {
                model:devisiModel
            },
            {
                model:privilegeModel
            }
        ]
    });

    return res.status(200).json({
        message:"success",
        data:result
    })

}

const getExecutorSelect = async(req, res) => {
    
    const result = await userModel.findAll({
        where:{
            is_executor:true
        }
    });

    return res.status(200).json({
        message:"success",
        data:result
    })

}

const getUserSelect = async(req, res) => {
    
    const result = await userModel.findAll();

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

    const hashPassword = await argon.hash(password);

    const privilege = await privilegeModel.create({
        dashboard:true,
        ticket_requestor:true,
        ticket_executor:false,
        entity:false,
        admin:false,
    })

    const result = await userModel.create({
        name,
        email,
        password:hashPassword,
        nomor_hp,
        devisi_id:devisi.id,
        penempatan_id:penempatan.id,
        status_user_id:status_user.id,
        privilege_id:privilege.id
    });

    res.status(201).json({
        message: 'success',
        data: result
    });
}

const updateUser = async(req, res) => {
    const {uuid} = req.params;
    const {name, email, nomor_hp, devisi_uuid, penempatan_uuid, status_user_uuid, is_executor, is_delete} = req.body;

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
        status_user_id:status_user.id,
        is_executor,
        is_delete
    });

    res.status(201).json({
        message: 'success',
        data: result
    });
}

const updatePassword = async(req, res) => {
    const {uuid} = req.params;
    const {password} = req.body;
    const {confPassword} = req.body;

    const user = await userModel.findOne({
        where:{
            uuid
        }
    })

    console.log(user, 'user');

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    if(!password){
        return res.status(401).json({
            message:"password can't null"
        })
    }

    if(password !== confPassword){
        return res.status(401).json({
            message:"password and confirmation password dosn't match"
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

const setPhotoProfile = async(req, res) => {
    const {uuid} = req.params;

    const user = await userModel.findOne({
        where:{
            uuid
        }
    });

    if(!user){
        return res.status(200).json({
            message:"user not found"
        })
    }

    const photo = req.files.photo;
    const ext = path.extname(photo.name);
    const photo_name = crypto.randomUUID()+ext;
    const photo_link = `/photo/${photo_name}`;
    const allowed_type = ['.png','.jpg','.jpeg'];

    //filter file type
    if(!allowed_type.includes(ext.toLowerCase())) return res.status(422).json({msg: "type file not allowed"});
    
    photo.mv(`./public/photo/${photo_name}`, async(err)=>{
        if(err) return res.status(500).json({message: err.message});
        try {
            await user.update({
                photo:photo.name,
                photo_name,
                photo_link
            });

            return res.status(201).json({message: "photo uploaded"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    });
}

module.exports = {
    getUsers,
    getExecutorSelect,
    getUserSelect,
    createUser,
    updateUser,
    getUserById,
    updatePassword,
    deleteUser,
    hardDeleteUser,
    setPhotoProfile
}
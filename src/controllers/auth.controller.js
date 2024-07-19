const {user : userModel} = require('../models');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

const register = async(req, res) => {
    const {name, email, password, nomor_hp, devisi_id, penempatan_id} = req.body;

    if(!name || !email || !password || !nomor_hp || !devisi_id || !penempatan_id){
        return res.status(404).json({
            message: "value cannot be null"
        });
    }

    const findName = await userModel.findOne({
        where:{
            name
        }
    });

    if(findName !== null){
        return res.status(403).json({
            message:"user registered"
        });
    }

    const hasPassword = await argon.hash(password);
    const response = await userModel.create({
        name,
        email,
        password:hasPassword,
        nomor_hp,
        devisi_id,
        penempatan_id,
        status_user_id:1,
        is_delete:0
    });

    const user = await userModel.findOne({
        where:{
            uuid:response.uuid
        },
        attributes: {
            exclude: ["id",'password'],
        }
    })

    return res.status(201).json({
        message: "success",
        data: user
    });
}

const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(404).json({
            message:"email or password can't be null"
        });
    }

    const findUser = await userModel.findOne({
        email
    });

    if(!findUser){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const match = await argon.verify(findUser.password, password);

    if(!match){
        return res.status(401).json({
            message:"wrong password"
        });
    }

    const token = jwt.sign(
        {
            uuid:findUser.uuid,
            name:findUser.name,
            email:findUser.email,
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return res.status(200).json({
        success: true,
        message: "login success",
        data:{
            token
        }
    });
}

const getMe = async(req, res) => {
    const user = req.user;

    const result = await userModel.findOne({
        where:{
            uuid:user.uuid
        },
        attributes:{
            exclude:['id','password']
        }
    })

    return res.status(200).json({
        message:'success',
        data:result
    })
}

module.exports = {
    register,
    login,
    getMe
}
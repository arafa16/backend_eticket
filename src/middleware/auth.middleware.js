const jwt = require('jsonwebtoken');
const {user : userModel, status_user:statusUserModel} = require('../models');

const verifyToken = async(req, res, next) => {
    
    const authHeader = req.headers["authorization"] || "";

    if(authHeader.split(" ").length !== 2){
        return res.status(401).json({
            message: "you don't have access",
            data: null
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
        if(err){
            return res.status(401).send({
                message:"access expired, please login again",
                data:err.expiredAt
            });
        }

        const user = await userModel.findOne({
            where:{
                uuid:decoded.uuid
            },
            include:[
                {
                    model:statusUserModel,
                    attributes:['name']
                }
            ]
        })

        if(!user){
            return res.status(404).json({
                message:"login failed, user not found or deleted"
            })
        }
    
        if(user.status_user.name !== 'active' || user.is_delete){
            return res.status(401).json({
                message: `you don't have access, status account is ${user.status_user.name}`
            })
        }

        req.user = user;

        next()
    });
}

module.exports = {
    verifyToken
}
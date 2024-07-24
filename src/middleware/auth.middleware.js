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

        const findUser = await userModel.findOne({
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

        if(!findUser){
            return res.status(404).json({
                message:"login failed, user not found or deleted"
            })
        }
    
        if(findUser.status_user.name !== 'active' || findUser.is_delete){
            return res.status(401).json({
                message: `you don't have access, status account is ${findUser.status_user.name}`
            })
        }

        req.user = decoded;

        console.log(req.user, 'req user')

        next()
    });
}

module.exports = {
    verifyToken
}
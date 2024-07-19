const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    
    const authHeader = req.headers["authorization"] || "";

    if(authHeader.split(" ").length !== 2){
        return res.status(401).json({
            message: "you don't have access",
            data: null
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message:"access expired, please login again",
                data:err.expiredAt
            });
        }

        req.user = decoded;

        next()
    });
}

module.exports = {
    verifyToken
}
const {
    slider : sliderModel,
} = require('../models');
const path = require('path');
const crypto = require('crypto');

const getSLiders = async(req, res)=>{

    const result = await sliderModel.findAll({
        where:{
            is_delete:false
        },
        order:[['sequence', 'ASC']]
    });

    return res.status(200).json({
        data:result,
        message:"success"
    })
}

const getSLiderById = async(req, res)=>{
    
    const result = await sliderModel.findOne({
        where:{
            uuid:req.params.uuid
        }
    });

    return res.status(200).json({
        data:result,
        message:"success"
    })
}

const getSLiderTable = async(req, res)=>{

    const result = await sliderModel.findAndCountAll({
        where:{
            is_delete:false
        },
        order:[['sequence', 'ASC']]
    });

    return res.status(200).json({
        data:result,
        message:"success"
    })
}

const createSlide = async(req, res) => {
    const {sequence, name} = req.body;

    const file = req.files.file;
    const ext = path.extname(file.name);
    const file_name = crypto.randomUUID()+ext;
    const file_link = `/slide/${file_name}`;
    const allowed_type = ['.png','.jpg','.jpeg'];

    //filter file type
    if(!allowed_type.includes(ext.toLowerCase())) return res.status(422).json({msg: "type file not allowed"});
    
    file.mv(`./public/slide/${file_name}`, async(err)=>{
        if(err) return res.status(500).json({message: err.message});
        try {
            await sliderModel.create({
                name:name,
                file_name,
                file_link,
                sequence:sequence,
            });

            return res.status(201).json({message: "file uploaded"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    });
}

const deleteSLider = async(req, res)=>{

    const result = await sliderModel.findOne({
        where:{
            uuid:req.params.uuid
        }
    });

    if(!result){
        return res.status(401).json({
            data:result,
            message:"not found"
        })
    }

    await result.destroy();

    return res.status(200).json({
        data:result,
        message:"success"
    })
}

module.exports = {
    createSlide,
    getSLiders,
    getSLiderTable,
    deleteSLider,
    getSLiderById
}
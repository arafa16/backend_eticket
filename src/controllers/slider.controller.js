const {
    slider : sliderModel,
} = require('../models');
const path = require('path');
const crypto = require('crypto');

const getSLiders = async(req, res)=>{

    const result = await sliderModel.findAll({
        where:{
            is_delete:false
        }
    });

    return res.status(200).json({
        data:result,
        message:"success"
    })
}

const createSlide = async(req, res) => {
    const {sequence} = req.body;

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
                name:file.name,
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

module.exports = {
    createSlide,
    getSLiders
}
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const {
    project_note_attachment:projectNoteAttachmentModel,
    project_note:projectNoteModel
} = require('../models');

const createAttachment = async(req, res) => {
    const {uuid} = req.params;

    const findData = await projectNoteModel.findOne({
        where:{
            uuid
        }
    });

    if(!findData){
        return res.status(200).json({
            message:"data not found"
        })
    }

    if(!req.files || req.files.file === null || req.files.file === undefined){
        return res.status(401).json({
            message:"file can't empty"
        })
    }

    const file = req.files.file;

    const ext = path.extname(file.name);
    const file_name = crypto.randomUUID()+ext;
    const file_link = `/attachment/project_note/${file_name}`;
    // const allowed_type = ['.png','.jpg','.jpeg','.xlsx','.doc'];

    //filter file type
    // if(!allowed_type.includes(ext.toLowerCase())) return res.status(422).json({msg: "type file not allowed"});

    file.mv(`./public/attachment/project_note/${file_name}`, async(err)=>{
        if(err) return res.status(500).json({message: err.message});
        try {
            await projectNoteAttachmentModel.create({
                ticket_id:ticket.id,
                name:file.name,
                file_name,
                file_link
            });

            return res.status(201).json({message: "file uploaded"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    });
    
}

const deleteAttachment = async(req, res) => {
    const {uuid} = req.params;

    const findData = await projectNoteAttachmentModel.findOne({
        where:{
            uuid
        }
    })

    if(!findData){
        return res.status(404).json({
            message:"attachment not found"
        })
    }

    fs.unlinkSync(`./public/${findData.file_link}`);

    const result = await findData.destroy();

    return res.status(200).json({
        message: "success",
        data:result
    })

}

module.exports = {
    createAttachment,
    deleteAttachment
}
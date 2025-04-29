const {
    project_note:projectNoteModel, 
    project:projectModel,
    project_note_status:projectNoteStatusModel,
} = require('../models');

const {createData:createDataHistory} = require('./project_history.controller');

const getDataByProject = async(req, res)=>{

    const {project_uuid, sort, is_delete} = req.query;
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    const queryObject = {};
    let sortList = {};
    

    const project = await projectModel.findOne({
        where:{
            uuid:project_uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message:"project not found"
        })
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = false;
    }

    if(project){
        queryObject.project_id = project.id
    }

    if(sort){
        sortList = sort;
    }else{
        sortList ='created_at';
    }

    const result = await projectNoteModel.findAndCountAll({
        where:queryObject,
        limit,
        offset,
        order:[[sortList, 'DESC']],
        include:[
            {
                model:projectNoteStatusModel
            },
            {
                model:projectModel
            }
        ]
    })

    return res.status(200).json({
        message:"success",
        data:result
    })
}

const createData = async(req, res)=>{
    const {project_uuid, user_uuid, description, project_note_status_uuid} = req.body;

    let project_note_status_id = '';
    let status_note_name = null;

    

    // const user = await userModel.findOne({
    //     where:{
    //         uuid:req.user.uuid
    //     }
    // })

    // if(!user){
    //     return res.status(404).json({
    //         message:"user not found"
    //     })
    // }

    const project = await projectModel.findOne({
        where:{
            uuid:project_uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message:"project not found"
        })
    }

    if(!project_note_status_uuid){
        project_note_status_id = 1;
        status_note_name = 'draft';
    }else{
        const project_note_status = await projectNoteStatusModel.findOne({
            where:{
                uuid:project_note_status_uuid
            }
        });

        if(!project_note_status){
            return res.status(404).json({
                message:"project note status not found"
            })
        }

        project_note_status_id = project_note_status.id
        status_note_name = project_note_status.name
    }

    const result = await projectNoteModel.create({
        project_id:project.id,
        description,
        project_note_status_id
    })

    createDataHistory({
        project_id:project.id,
        user_id:req.user.id,
        description: 'create note (' + description + `) : set status to ${status_note_name}`
    });

    return res.status(201).json({
        message:"success",
        data:result
    })
}

const updateData = async(req, res)=>{
    const {uuid} = req.params;

    const {project_uuid, description, project_note_status_uuid} = req.body;

    const project_note = await projectNoteModel.findOne({
        where:{
            uuid
        }
    })

    if(!project_note){
        return res.status(404).json({
            message:"note project not found"
        })
    }

    const project = await projectModel.findOne({
        where:{
            uuid:project_uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message:"project not found"
        })
    }

    const project_note_status = await projectNoteStatusModel.findOne({
        where:{
            uuid:project_note_status_uuid
        }
    });

    if(!project_note_status){
        return res.status(404).json({
            message:"note project not found"
        })
    }

    const result = await project_note.update({
        project_id:project.id,
        description,
        project_note_status_id:project_note_status.id
    })

    createDataHistory({
        project_id:project.id,
        user_id:req.user.id,
        description: 'change note (' + description + `) : update status to ${project_note_status.name}`
    });

    return res.status(201).json({
        message:"success",
        data:result
    })
}

const deleteData = async(req, res)=>{
    const {uuid} = req.params;

    const project_note = await projectNoteModel.findOne({
        where:{
            uuid
        }
    })

    if(!project_note){
        return res.status(404).json({
            message:"note project not found"
        })
    }
    const result = await project_note.update({
        is_delete:true
    })

    return res.status(201).json({
        message:"success deleted",
        data:result
    })
}

const hardDeleteData = async(req, res)=>{
    const {uuid} = req.params;

    const project_note = await projectNoteModel.findOne({
        where:{
            uuid
        }
    })

    if(!project_note){
        return res.status(404).json({
            message:"note project not found"
        })
    }
    const result = await project_note.destroy();

    return res.status(201).json({
        message:"success",
        data:result
    })
}

module.exports = {
    getDataByProject,
    createData,
    updateData,
    deleteData,
    hardDeleteData
}
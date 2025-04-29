const { Op, where } = require('sequelize');
const {
    project: projectModel, 
    project_status: projectStatusModel, 
    user: userModel,
    project_type: projectTypeModel,
    devisi: devisiModel,
    penempatan: penempatanModel,
    project_history: projectHistoryModel,
    project_attachment: projectAttachmentModal
} = require('../models');

const {createData:createDataHistory} = require('./project_history.controller');

const getDatas = async(req, res) => {
    const {uuid, code, year, name, sort, is_delete, search, not_status} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    const querySearchUser = {};

    let sortList = {};

    if(uuid){
        queryObject.uuid = uuid
    }

    if(name){
        queryObject.name = name
    }

    if(code){
        queryObject.code = code
    }

    if(year){
        queryObject.year = year
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
    }

    
    if(not_status){
        const notStatus = not_status.split(',');

        queryObject.project_status_id = {
            [Op.not]:notStatus
        }
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;

    if(sort){
        sortList = sort;
    }else{
        sortList ='code';
    }

    if(search !== null){
        querySearchObject.code = {[Op.like]:`%${search}%`}
        querySearchObject.year = {[Op.like]:`%${search}%`}
    }

    const result = await projectModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}
        ],
        limit,
        offset,
        order:[sortList],
        include:[
            {
                as:'user',
                model:userModel,
                include:[
                    {
                        model:devisiModel
                    },
                    {
                        model:penempatanModel
                    }
                ]
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                model:projectTypeModel
            },
            {
                model:projectStatusModel
            },
        ],
        order:[
            ['date','DESC']
        ]
    });

    return res.status(200).json({
        message: 'success',
        data: result
    })
}

const getCount = async(req, res) => {
    const {user_uuid, executor_uuid} = req.query;

    const queryObject = {};

    if(user_uuid){
        const user = await userModel.findOne({
            where:{
                uuid:user_uuid
            }
        });

        queryObject.user_id = user.id
    }

    if(executor_uuid){
        const user = await userModel.findOne({
            where:{
                uuid:executor_uuid
            }
        });

        if(user !== null){
            queryObject.executor_id = user.id
        }
    }

    const draft = await projectModel.count({
        where:[
            queryObject,
            {
                project_status_id:1,
                is_delete:0
            }
        ]
    });

    const pengajuan = await projectModel.count({
        where:[
            queryObject,
            {
                project_status_id:2,
                is_delete:0
            }
        ]
    });

    const process = await projectModel.count({
        where:[
            queryObject,
            {
                project_status_id:3,
                is_delete:0
            }
        ]
    });

    const done = await projectModel.count({
        where:[
            queryObject,
            {
                project_status_id:4,
                is_delete:0
            }
        ]
    });

    const cancel = await projectModel.count({
        where:[
            queryObject,
            {
                project_status_id:5,
                is_delete:0
            }
        ]
    });

    const all = await projectModel.count({
        where:[
            queryObject,
            {
                is_delete:0
            }
        ]
    });

    return res.status(200).json({
        message: 'success',
        data: {
            draft, pengajuan, process, done, cancel, all
        }
    })
}

const getDataById = async(req, res) => {

    const {uuid} = req.query;

    const queryObject = {};
    const history = {};

    if(uuid){
        queryObject.uuid = uuid
    }

    const result = await projectModel.findOne({
        where:queryObject,
        include:[
            {
                as:'user',
                model:userModel,
                include:[
                    {
                        model:devisiModel
                    },
                    {
                        model:penempatanModel
                    }
                ]
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                model:projectTypeModel
            },
            {
                model:projectStatusModel
            },
            {
                model:projectAttachmentModal
            },
            {
                model:projectHistoryModel,
                include:{
                    model:userModel
                }
            }
        ]
    });
    

    return res.status(200).json({
        message: 'success',
        data:result,
    });
}

const getDatasByUser = async(req, res) => {
    const {search, is_delete} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    const querySearchUser = {};

    const user = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    })

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;
    
    if(user){
        queryObject.user_id = user.id
    }

    if(req.query.notStatus){
        const notStatus = req.query.notStatus.split(',');

        queryObject.project_status_id = {
            [Op.not]:notStatus
        }
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
    }

    if(search !== null){
        querySearchObject.name = {[Op.like]:`%${search}%`}
        querySearchObject.code = {[Op.like]:`%${search}%`}
        querySearchObject.year = {[Op.like]:`%${search}%`}
    }

    const result = await projectModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}
        ],
        include:[
            {
                model:projectTypeModel
            },
            {
                model:projectStatusModel
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                as:'user',
                model:userModel,
            }
        ],
        limit,
        offset,
        order:[
            ['date','DESC']
        ]
    });

    return res.status(200).json({
        message: 'success',
        data: result
    })
}

const getDatasByPic = async(req, res) => {
    const {uuid, search, is_delete} = req.query;

    const queryObject = {};
    const querySearchObject = {};
    const querySearchUser = {};

    const user = await userModel.findOne({
        where:{
            uuid:uuid
        }
    });

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = Number(page - 1) * limit;
    const notStatus = req.query.notStatus.split(',');

    if(user){
        queryObject.executor_id = user.id
    }

    if(notStatus){
        queryObject.project_status_id = {
            [Op.not]:notStatus
        }
    }

    if(is_delete){
        queryObject.is_delete = is_delete
    }else{
        queryObject.is_delete = 0
    }

    if(search !== null){
        querySearchObject.name = {[Op.like]:`%${search}%`}
        querySearchObject.code = {[Op.like]:`%${search}%`}
        querySearchObject.year = {[Op.like]:`%${search}%`}
    }

    const result = await projectModel.findAndCountAll({
        where:[
            queryObject,
            {[Op.or]:querySearchObject}
        ],
        include:[
            {
                model:projectTypeModel
            },
            {
                model:projectStatusModel
            },
            {
                as:'executor',
                model:userModel,
            },
            {
                as:'user',
                model:userModel,
            }
        ],
        limit,
        offset,
        order:[
            ['date','DESC']
        ]
    });

    return res.status(200).json({
        message: 'success',
        data: result
    })
}

const createData = async(req, res) => {
    const {name, user_uuid, executor_uuid, description, project_status_uuid, project_type_uuid, target_date} = req.body;
    
    let executor_id = ''
    let user_id = null

    if(!description || !project_type_uuid){
        return res.status(401).json({
            message: "field can't null"
        })
    }


    if(!user_uuid){
        const user = await userModel.findOne({
            where:{
                uuid:req.user.uuid
            }
        });

        user_id = user.id
    }else{
        const user = await userModel.findOne({
            where:{
                uuid:user_uuid
            }
        });

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }else{
            user_id = user.id
        }
    }

    if(!executor_uuid){
        executor_id=null;
    }else{
        const executor = await userModel.findOne({
            where:{
                uuid:executor_uuid
            }
        });

        if(!executor){
            return res.status(404).json({
                message: "executor not found"
            })
        }

        executor_id=executor.id;
    }

    console.log(project_status_uuid, 'project_status_uuid')

    let project_status = null;

    if(project_status_uuid !== ""){
        console.log(project_status_uuid, 'project_status_uuid is define')

        const find_status = await projectStatusModel.findOne({
            where:{
                uuid:project_status_uuid
            }
        })        

        project_status = find_status
    }else{
        console.log(project_status_uuid, 'project_status_uuid is not define')

        const find_status = await projectStatusModel.findOne({
            where:{
                sequence:1
            }
        })

        console.log(find_status, 'find_status')

        project_status = find_status
    }

    const project_type = await projectTypeModel.findOne({
        where:{
            uuid:project_type_uuid
        }
    })

    if(!project_type){
        return res.status(404).json({
            message: "type project not found"
        })
    }

    const date = new Date();
    const year = date.getFullYear();


    const findData = await projectModel.findAndCountAll({
        where:{
            year
        }
    });


    const code = Number(findData.count) + 1;

    const display_code = `P${code}${year}`;
    
    const result = await projectModel.create({
        user_id,
        name,
        date,
        code,
        display_code,
        year,
        description:description,
        project_status_id:project_status.id,
        project_type_id:project_type.id,
        executor_id,
        target_date
    })

    createDataHistory({
        project_id:result.id,
        user_id:user_id,
        description:'create project'
    });

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const updateData = async(req, res) => {
    const {uuid} = req.params;
    const {user_uuid, name, executor_uuid, description, project_type_uuid, target_date} = req.body;

    let executor_id = null;

    const userLogin = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });

    const project = await projectModel.findOne({
        where:{
            uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message:"project not found"
        })
    }

    const user = await userModel.findOne({
        where:{
            uuid:user_uuid
        }
    });

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    if(!executor_uuid){
        executor_id=null;
    }else{
        const executor = await userModel.findOne({
            where:{
                uuid:executor_uuid
            }
        });

        if(!executor){
            return res.status(404).json({
                message: "executor not found"
            })
        }

        executor_id=executor.id;
    }

    const project_type = await projectTypeModel.findOne({
        where:{
            uuid:project_type_uuid
        }
    })

    if(!project_type){
        return res.status(404).json({
            message: "type project not found"
        })
    }
    
    const result = await project.update({
        user_id:user.id,
        name:name,
        description:description,
        project_type_id:project_type.id,
        executor_id,
        target_date
    })

    createDataHistory({
        project_id:result.id,
        user_id:userLogin.id,
        description:'edit project'
    });

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const updateStatusData = async(req, res) => {
    const {uuid} = req.params;
    const {project_status_uuid} = req.body;

    const user = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });

    if(!user){
        return res.status(404).json({
            message: "please login again"
        })
    }

    const project = await projectModel.findOne({
        where:{
            uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message:"project not found"
        })
    }

    const project_status = await projectStatusModel.findOne({
        where:{
            uuid:project_status_uuid
        }
    })

    if(!project_status){
        return res.status(404).json({
            message: "status project not found"
        })
    }

    const result = await project.update({
        project_status_id:project_status.id,
    })

    createDataHistory({
        project_id:result.id,
        user_id:user.id,
        description:`update status to ${project_status.name}`
    });

    return res.status(201).json({
        message: "success",
        data:result
    });
}

const deleteData = async(req, res) => {
    const {uuid} = req.params;

    const project = await projectModel.findOne({
        where:{
            uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message: "project not found"
        })
    }

    const user = await userModel.findOne({
        where:{
            uuid:req.user.uuid
        }
    });

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    await project.update({
        is_delete:true
    });

    createDataHistory({
        project_id:project.id,
        user_id:user.id,
        description:'update project'
    });

    return res.status(201).json({
        message: "delete project success"
    })
}

const hardDeleteData = async(req, res) => {
    const {uuid} = req.params;

    

    const project = await projectModel.findOne({
        where:{
            uuid
        }
    });

    if(!project){
        return res.status(404).json({
            message: "project not found"
        })
    }

    await projectHistoryModel.destroy({
        where:{
            project_id:project.id
        }
    });

    const result = await project.destroy();

    return res.status(201).json({
        message: "delete project from database success",
        data:result
    })
}

module.exports = {
    getDatas,
    getCount,
    getDataById,
    createData,
    updateData,
    deleteData,
    hardDeleteData,
    getDatasByUser,
    getDatasByPic,
    updateStatusData
}

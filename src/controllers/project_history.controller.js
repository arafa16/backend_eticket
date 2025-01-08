const {project_history:projectHistoryModel} = require('../models');

const createData = async(data) => {
    await projectHistoryModel.create({
        project_id:data.project_id,
        description:data.description,
        user_id:data.user_id
    })
}

module.exports = {
    createData
}
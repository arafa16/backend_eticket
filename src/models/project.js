'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.belongsTo(models.user,{
        foreignKey:"user_id"
      });
      project.belongsTo(models.user,{
        foreignKey:"executor_id",
        as:'executor'
      });
      project.belongsTo(models.project_status,{
        foreignKey:"project_status_id"
      });
      project.belongsTo(models.project_type,{
        foreignKey:"project_type_id"
      });
    }
  }
  project.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    code_project: DataTypes.STRING,
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    executor_id: DataTypes.INTEGER,
    project_status_id: DataTypes.INTEGER,
    project_type_id: DataTypes.INTEGER,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'project',
    underscored: true,
  });
  return project;
};
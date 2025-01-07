'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment_project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      attachment_project.belongsTo(models.project,{
        foreignKey:"project_id"
      });
    }
  }
  attachment_project.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    file_name: DataTypes.STRING,
    file_link: DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'attachment_project',
    underscored: true,
  });
  return attachment_project;
};
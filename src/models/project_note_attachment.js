'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_note_attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project_note_attachment.belongsTo(models.project_note,{
        foreignKey:"project_note_id"
      });
    }
  }
  project_note_attachment.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    project_note_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    file_name: DataTypes.STRING,
    file_link: DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'project_note_attachment',
    underscored: true,
  });
  return project_note_attachment;
};
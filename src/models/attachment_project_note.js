'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment_project_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      attachment_project_note.belongsTo(models.project_note,{
        foreignKey:"project_note_id"
      });
    }
  }
  attachment_project_note.init({
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
    modelName: 'attachment_project_note',
    underscored: true,
  });
  return attachment_project_note;
};
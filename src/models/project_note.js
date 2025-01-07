'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project_note.belongsTo(models.project,{
        foreignKey:"project_id"
      });
      project_note.belongsTo(models.project_note_status,{
        foreignKey:"project_note_status_id"
      });
    }
  }
  project_note.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.INTEGER,
    project_note_status_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'project_note',
    underscored: true,
  });
  return project_note;
};
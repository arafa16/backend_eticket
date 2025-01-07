'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project_history.belongsTo(models.project,{
        foreignKey:"project_id"
      });
      project_history.belongsTo(models.user,{
        foreignKey:"user_id"
      });
    }
  }
  project_history.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'project_history',
    underscored: true,
  });
  return project_history;
};
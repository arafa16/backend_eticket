'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  status_note.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    is_select: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'status_note',
    underscored: true,
  });
  return status_note;
};
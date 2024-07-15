'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  status_user.init({
    uuid:DataTypes.STRING,
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'status_user',
    underscored: true,
  });
  return status_user;
};
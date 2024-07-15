'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penempatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  penempatan.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'penempatan',
    underscored: true,
  });
  return penempatan;
};
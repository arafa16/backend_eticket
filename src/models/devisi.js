'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class devisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  devisi.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'devisi',
    underscored: true,
  });
  return devisi;
};
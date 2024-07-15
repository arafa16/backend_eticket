'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nomor_hp: DataTypes.STRING,
    devisi_id: DataTypes.INTEGER,
    penempatan_id: DataTypes.INTEGER,
    status_user_id: DataTypes.INTEGER,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};
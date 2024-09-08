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
      user.belongsTo(models.status_user,{
        foreignKey:"status_user_id"
      });
      user.belongsTo(models.penempatan,{
        foreignKey:"penempatan_id"
      });
      user.belongsTo(models.devisi,{
        foreignKey:"devisi_id"
      });
      user.belongsTo(models.privilege,{
        foreignKey:"privilege_id"
      });
      user.hasMany(models.history_ticket);
    }
  }
  user.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    photo_name: DataTypes.STRING,
    photo_link: DataTypes.STRING,
    password: DataTypes.STRING,
    nomor_hp: DataTypes.STRING,
    privilege_id: DataTypes.INTEGER,
    devisi_id: DataTypes.INTEGER,
    penempatan_id: DataTypes.INTEGER,
    status_user_id: DataTypes.INTEGER,
    is_executor: DataTypes.BOOLEAN,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_reservation_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car_reservation_status.hasMany(models.car_reservation);
    }
  }
  car_reservation_status.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    is_select: DataTypes.BOOLEAN,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'car_reservation_status',
    underscored: true,
  });
  return car_reservation_status;
};
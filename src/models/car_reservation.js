"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car_reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car_reservation.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      car_reservation.belongsTo(models.user, {
        as: "driver",
        foreignKey: "driver_id",
      });
      car_reservation.belongsTo(models.car_reservation_status, {
        foreignKey: "car_reservation_status_id",
      });
      car_reservation.belongsTo(models.car, {
        foreignKey: "car_id",
      });
      car_reservation.hasMany(models.car_reservation_history);
    }
  }
  car_reservation.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      display_code: DataTypes.STRING,
      year: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      start_location: DataTypes.TEXT,
      finish_location: DataTypes.TEXT,
      description: DataTypes.TEXT,
      driver_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      car_id: DataTypes.INTEGER,
      car_reservation_status_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      is_delete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "car_reservation",
      underscored: true,
    }
  );
  return car_reservation;
};

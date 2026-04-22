"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car_reservation_attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car_reservation_attachment.belongsTo(models.car_reservation, {
        foreignKey: "car_reservation_id",
      });
    }
  }
  car_reservation_attachment.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      car_reservation_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      file_name: DataTypes.STRING,
      file_link: DataTypes.STRING,
      is_delete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "car_reservation_attachment",
      underscored: true,
    },
  );
  return car_reservation_attachment;
};

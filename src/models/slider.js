'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class slider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slider.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    file_name: DataTypes.STRING,
    file_link: DataTypes.STRING,
    sequence: DataTypes.INTEGER,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'slider',
    underscored: true,
  });
  return slider;
};
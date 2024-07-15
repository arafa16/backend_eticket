'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attachment_ticket.init({
    uuid: DataTypes.STRING,
    ticket_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_link: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'attachment_ticket',
    underscored: true,
  });
  return attachment_ticket;
};
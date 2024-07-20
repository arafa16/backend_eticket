'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment_note_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  attachment_note_ticket.init({
    uuid: DataTypes.STRING,
    note_ticket_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_link: DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'attachment_note_ticket',
    underscored: true,
  });
  return attachment_note_ticket;
};
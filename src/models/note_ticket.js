'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  note_ticket.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    ticket_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status_note_id: DataTypes.INTEGER,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'note_ticket',
    underscored: true,
  });
  return note_ticket;
};
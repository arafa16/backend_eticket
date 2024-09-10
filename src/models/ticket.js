'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ticket.belongsTo(models.user,{
        foreignKey:"user_id",
        as:'user'
      });
      ticket.belongsTo(models.user,{
        foreignKey:"executor_id",
        as:'executor'
      });
      ticket.belongsTo(models.status_ticket,{
        foreignKey:"status_ticket_id"
      });
      ticket.belongsTo(models.type_ticket,{
        foreignKey:"type_ticket_id"
      });
      ticket.hasMany(models.attachment_ticket);
      
      ticket.hasMany(models.history_ticket);
    }
  }
  ticket.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    code: DataTypes.INTEGER,
    year: DataTypes.STRING,
    code_ticket: DataTypes.STRING,
    description: DataTypes.STRING,
    executor_id: DataTypes.INTEGER,
    type_ticket_id: DataTypes.INTEGER,
    status_ticket_id: DataTypes.INTEGER,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ticket',
    underscored: true,
  });
  return ticket;
};
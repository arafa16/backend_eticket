'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      history_ticket.belongsTo(models.user,{
        foreignKey:"user_id"
      })
    }
  }
  history_ticket.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.INTEGER,
    ticket_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN,
    created_at:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'history_ticket',
    underscored: true,
  });
  return history_ticket;
};
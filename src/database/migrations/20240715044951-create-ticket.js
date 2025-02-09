'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE
      },
      code:{
        type: Sequelize.INTEGER,
      },
      year:{
        type: Sequelize.STRING,
      },
      code_ticket:{
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      description: {
        type: Sequelize.STRING
      },
      executor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      type_ticket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "type_tickets",
          key: "id",
        },
      },
      status_ticket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "status_tickets",
          key: "id",
        },
      },
      is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};
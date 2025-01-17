'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('privileges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
      },
      dashboard: {
        type: Sequelize.BOOLEAN,
        defaultValue:1
      },
      ticket: {
        type: Sequelize.BOOLEAN,
        defaultValue:1
      },
      ticket_requestor: {
        type: Sequelize.BOOLEAN,
        defaultValue:1
      },
      ticket_executor: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      project: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      project_executor: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      project_administrator: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      entity: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
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
    await queryInterface.dropTable('privileges');
  }
};
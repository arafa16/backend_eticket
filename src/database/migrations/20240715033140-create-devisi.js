'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('devisis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING
      },
      sequence: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      is_select: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
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
    await queryInterface.dropTable('devisis');
  }
};
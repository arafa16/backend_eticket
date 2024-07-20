'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attachment_note_tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      note_ticket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "note_tickets",
          key: "id",
        },
      },
      file_name: {
        type: Sequelize.STRING
      },
      file_link: {
        type: Sequelize.STRING
      },
      is_delete: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('attachment_note_tickets');
  }
};
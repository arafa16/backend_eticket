'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attachment_project_notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      project_note_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "project_notes",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file_link: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('attachment_project_notes');
  }
};
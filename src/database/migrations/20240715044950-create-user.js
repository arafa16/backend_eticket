'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nomor_hp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      privilege_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "privileges",
          key: "id",
        },
      },
      devisi_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "devisis",
          key: "id",
        },
      },
      penempatan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "penempatans",
          key: "id",
        },
      },
      status_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "status_users",
          key: "id",
        },
      },
      is_executor: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
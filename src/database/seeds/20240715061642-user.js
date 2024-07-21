const uuid = require('uuid');
const argon = require('argon2');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id:1,
      uuid:uuid.v4(),
      name: 'admin',
      email: 'admin@gmail.com',
      password: await argon.hash('admin'),
      nomor_hp: '+62',
      devisi_id:1,
      penempatan_id:1,
      status_user_id:2,
      created_at: new Date(),
      updated_at: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

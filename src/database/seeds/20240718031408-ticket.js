const uuid = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tickets',[
      {
        uuid:uuid.v4(),
        user_id:1,
        date: new Date(),
        code:1,
        year:2024,
        code_ticket: 'T12024',
        description:'test',
        executor_id:1,
        type_ticket_id:10,
        status_ticket_id:1,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tickets', null, {});
  }
};

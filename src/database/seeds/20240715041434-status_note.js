const uuid = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status_notes',[
      {
        uuid:uuid.v4(),
        name:'draft',
        sequence:1,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'proses',
        sequence:2,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'done',
        sequence:3,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'panding',
        sequence:4,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'cancel',
        sequence:5,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('status_notes', null, {});
  }
};

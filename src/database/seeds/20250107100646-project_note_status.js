const uuid = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('project_note_statuses',[
      {
        id:1,
        uuid:uuid.v4(),
        name:'draft',
        sequence:1,
        is_select:true,
        is_active:true,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:2,
        uuid:uuid.v4(),
        name:'proses',
        sequence:2,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:3,
        uuid:uuid.v4(),
        name:'done',
        sequence:3,
        is_select:true,
        is_active:true,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:4,
        uuid:uuid.v4(),
        name:'panding',
        sequence:4,
        is_select:true,
        is_active:true,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:5,
        uuid:uuid.v4(),
        name:'cancel',
        sequence:5,
        is_select:true,
        is_active:true,
        is_delete:false,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_note_statuses', null, {});
  }
};

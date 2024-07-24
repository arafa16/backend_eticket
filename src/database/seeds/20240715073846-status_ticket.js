const uuid = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status_tickets',[
      {
        id:1,
        uuid:uuid.v4(),
        name:'draft',
        sequence:1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:2,
        uuid:uuid.v4(),
        name:'pengajuan',
        sequence:2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:3,
        uuid:uuid.v4(),
        name:'proses pengerjaan',
        sequence:3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:4,
        uuid:uuid.v4(),
        name:'done',
        sequence:4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:5,
        uuid:uuid.v4(),
        name:'panding',
        sequence:5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:6,
        uuid:uuid.v4(),
        name:'cancel',
        sequence:6,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('status_tickets', null, {});
  }
};

const uuid = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('type_tickets',[
      {
        uuid:uuid.v4(),
        name:'email',
        sequence:1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'jaringan',
        sequence:2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'laptop',
        sequence:3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'printer',
        sequence:4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'internet',
        sequence:5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'cctv',
        sequence:6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'teams',
        sequence:7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'request pengadaan',
        sequence:8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'erp',
        sequence:9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uuid:uuid.v4(),
        name:'lain-lain',
        sequence:10,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('type_tickets', null, {});
  }
};

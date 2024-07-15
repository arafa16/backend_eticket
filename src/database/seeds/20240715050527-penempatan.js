const uuid = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('penempatans', [
      {
        id:1,
        uuid:uuid.v4(),
        name: 'pertanian',
        sequence:1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:2,
        uuid:uuid.v4(),
        name: 'rukan',
        sequence:2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:3,
        uuid:uuid.v4(),
        name: 'tebet',
        sequence:3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:4,
        uuid:uuid.v4(),
        name: 'cipinang',
        sequence:4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:5,
        uuid:uuid.v4(),
        name: 'yogyakarta',
        sequence:5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:6,
        uuid:uuid.v4(),
        name: 'bandung',
        sequence:6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:7,
        uuid:uuid.v4(),
        name: 'surabaya',
        sequence:7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:8,
        uuid:uuid.v4(),
        name: 'palembang',
        sequence:8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:9,
        uuid:uuid.v4(),
        name: 'medan',
        sequence:9,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('penempatans', null, {});
  }
};

const uuid = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('penempatans', [
      {
        id:1,
        uuid:uuid.v4(),
        name: 'Rukan',
        sequence:1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:2,
        uuid:uuid.v4(),
        name: 'Pertanian',
        sequence:2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:3,
        uuid:uuid.v4(),
        name: 'Tebet',
        sequence:3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:4,
        uuid:uuid.v4(),
        name: 'Bandung',
        sequence:4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:5,
        uuid:uuid.v4(),
        name: 'Yogyakarta',
        sequence:5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:6,
        uuid:uuid.v4(),
        name: 'Cipinang',
        sequence:6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:7,
        uuid:uuid.v4(),
        name: 'Surabaya',
        sequence:7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:8,
        uuid:uuid.v4(),
        name: 'Makasar',
        sequence:8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:9,
        uuid:uuid.v4(),
        name: 'Medan',
        sequence:9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:10,
        uuid:uuid.v4(),
        name: 'Palembang',
        sequence:9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:11,
        uuid:uuid.v4(),
        name: 'Balikpapan',
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

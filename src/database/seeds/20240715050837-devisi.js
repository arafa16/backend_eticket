const uuid = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('devisis',[
      {
        id:1,
        uuid:uuid.v4(),
        name: 'administrator',
        sequence:1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:2,
        uuid:uuid.v4(),
        name: 'finance',
        sequence:2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:3,
        uuid:uuid.v4(),
        name: 'procur',
        sequence:3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:4,
        uuid:uuid.v4(),
        name: 'hcm',
        sequence:4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:5,
        uuid:uuid.v4(),
        name: 'GS',
        sequence:5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id:6,
        uuid:uuid.v4(),
        name: 'sales',
        sequence:6,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('devisis', null, {});
  }
};

const uuid = require('uuid');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('project_types',[
          {
            id:1,
            uuid:uuid.v4(),
            name:'Application',
            sequence:1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:2,
            uuid:uuid.v4(),
            name:'Network',
            sequence:2,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:3,
            uuid:uuid.v4(),
            name:'Purcase',
            sequence:3,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:4,
            uuid:uuid.v4(),
            name:'Project',
            sequence:4,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_types', null, {});
  }
};

const uuid = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('privileges',[
      {
        id:1,
        uuid:uuid.v4(),
        dashboard:1,
        ticket:1,
        ticket_requestor:1,
        ticket_executor:1,
        project:1,
        project_executor:1,
        project_administrator:1,
        entity:1,
        admin:1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('privileges', null, {})
  }
};

const uuid = require("uuid");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("vehicle_allocations", [
      {
        id: 1,
        uuid: uuid.v4(),
        name: "Mobil Operasional",
        sequence: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        uuid: uuid.v4(),
        name: "Grab",
        sequence: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("vehicle_allocations", null, {});
  },
};

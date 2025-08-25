const uuid = require("uuid");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("car_reservation_statuses", [
      {
        id: 1,
        uuid: uuid.v4(),
        name: "draft",
        sequence: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        uuid: uuid.v4(),
        name: "pengajuan",
        sequence: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        uuid: uuid.v4(),
        name: "dikonfirmasi",
        sequence: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        uuid: uuid.v4(),
        name: "terjadwal",
        sequence: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        uuid: uuid.v4(),
        name: "on drive",
        sequence: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        uuid: uuid.v4(),
        name: "done",
        sequence: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        uuid: uuid.v4(),
        name: "cancel",
        sequence: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("car_reservation_statuses", null, {});
  },
};

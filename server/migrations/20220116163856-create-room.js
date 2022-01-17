"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noti: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};

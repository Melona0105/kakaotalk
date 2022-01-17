"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User_in_rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User_in_rooms");
  },
};

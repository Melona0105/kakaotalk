"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Chats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      read: {
        type: Sequelize.BOOLEAN,
      },
      send_date: {
        type: Sequelize.TIME,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Chats");
  },
};

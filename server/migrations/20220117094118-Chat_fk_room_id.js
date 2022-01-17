"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Chats", "room_id", {
      type: "integer",
      references: {
        model: "Rooms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Chats", "room_id");
  },
};

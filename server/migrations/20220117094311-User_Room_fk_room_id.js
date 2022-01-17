"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_in_rooms", "room_id", {
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
    await queryInterface.removeColumn("user_in_rooms", "room_id");
  },
};

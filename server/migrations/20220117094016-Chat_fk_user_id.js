"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Chats", "user_id", {
      type: "integer",
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Chats", "user_id");
  },
};

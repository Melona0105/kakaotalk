"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Friends", "user_id", {
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
    await queryInterface.removeColumn("Friends", "user_id");
  },
};

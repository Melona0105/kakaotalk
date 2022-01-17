"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Friend, { foreignKey: "user_id" });
      User.hasMany(models.Friend, { foreignKey: "friend" });
      User.hasMany(models.Chat, { foreignKey: "user_id" });
      User.belongsToMany(models.Room, {
        through: "User_in_room",
        targetKey: "id",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      userbirth: DataTypes.STRING,
      music: DataTypes.STRING,
      comment: DataTypes.STRING,
      photo: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

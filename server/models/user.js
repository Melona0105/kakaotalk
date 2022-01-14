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
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      userBirth: DataTypes.STRING,
      song: DataTypes.STRING,
      comment: DataTypes.STRING,
      photo: DataTypes.BLOB,
      argreements: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 유저는, 프랜드를 여럿 가질 수 있기에, 프랜드에 유저 아이디를 넣어준다.
      models.User.hasMany(models.Friend, {
        foreignKey: "user_id",
      });

      // 유저는, 프랜드를 여럿 가질 수 있기에, 프랜드에 유저 아이디를 넣어준다.
      models.User.hasMany(models.Friend, {
        foreignKey: "friend_id",
      });
    }
  }
  Friend.init(
    {},
    {
      sequelize,
      modelName: "Friend",
    }
  );
  return Friend;
};

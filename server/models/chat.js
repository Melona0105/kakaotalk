"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 유저는 모델챗을 여럿 가질 수 있기에 모델챗에 유저 아이디를 넣어준다.
      Chat.belongsTo(models.User, { foreignKey: "user_id" });
      // Room은 챗을 여럿 가질 수 있기에 모델챗에 Room 아이디를 넣어준다.
      Chat.belongsTo(models.Room, { foreignKey: "room_id" });
    }
  }
  Chat.init(
    {
      content: DataTypes.STRING,
      read: DataTypes.BOOLEAN,
      send_date: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};

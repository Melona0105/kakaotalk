module.exports = {
  // users
  login: require("./users/login"),
  signup: require("./users/signup"),
  userinfo: require("./users/userinfo"),
  checkEmail: require("./users/checkEmail"),
  getFriend: require("./users/getFriend"),

  // chats

  // friends
  findFriend: require("./friends/findFriend"),
  addFriend: require("./friends/addFriend"),

  // rooms
  getRoomInfo: require("./rooms/getRoomInfo"),
};

module.exports = {
  // users
  login: require("./users/login"),
  signup: require("./users/signup"),
  userinfo: require("./users/userinfo"),
  checkEmail: require("./users/checkEmail"),
  getFriends: require("./users/getFriends"),

  // chats
  getChats: require("./chat/getChats"),

  // friends
  findFriend: require("./friends/findFriend"),
  addFriend: require("./friends/addFriend"),

  // rooms
  getRoomInfo: require("./rooms/getRoomInfo"),
};

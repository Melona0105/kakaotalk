module.exports = {
  // users
  login: require("./users/login"),
  signup: require("./users/signup"),
  userinfo: require("./users/userinfo"),
  checkEmail: require("./users/checkEmail"),
  getFriends: require("./users/getFriends"),
  getRooms: require("./users/getRooms"),

  // chats
  getChats: require("./chat/getChats"),

  // friends
  findFriend: require("./friends/findFriend"),
  addFriend: require("./friends/addFriend"),
  deleteFriend: require("./friends/deleteFriend"),
  blockFriend: require("./friends/blockFriend"),
  hideFriend: require("./friends/hideFriend"),
  rollbackFriend: require("./friends/rollbackFriend"),

  // rooms
  getRoomId: require("./rooms/getRoomId"),
  getRoomInfo: require("./rooms/getRoomInfo"),

  //edit
  username: require("./edit/username"),
};

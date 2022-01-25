import Apis from "../apis";
import client from "../Socket";

const friendService = {
  getFindedFriend: async (friendEmail, callback1, callback2) => {
    try {
      const { status, data } = await Apis.friends.findFriend(friendEmail);

      if (status === 202) {
        callback1(true);
      }

      callback2(data.friendInfo);
    } catch (err) {
      throw err;
    }
  },

  updateFriendInfo: async (friendInfo, callback) => {
    try {
      await Apis.friends.addFriend(friendInfo);

      callback(true);
    } catch (err) {
      throw err;
    }
  },

  rollbackFriend: async (username) => {
    try {
      await Apis.friends.rollbackFriend(username);
    } catch (err) {
      throw err;
    }
  },

  blockFriend: async (username) => {
    try {
      await Apis.friends.blockFriend(username);
    } catch (err) {
      throw err;
    }
  },

  hideFriend: async (username) => {
    try {
      await Apis.friends.hideFriend(username);
    } catch (err) {
      throw err;
    }
  },

  deleteFriend: async (username) => {
    try {
      await Apis.friends.deleteFriend(username);
    } catch (err) {
      throw err;
    }
  },
};

export default friendService;

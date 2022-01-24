import Apis from "../apis";

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
};

export default friendService;

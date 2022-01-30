import Apis from "../apis";

const roomService = {
  fetchRoomInfo: async (room_id, id, callback) => {
    try {
      const { roomInfo } = await Apis.rooms.getRoomInfo(room_id);

      callback(roomInfo.filter((el) => el.user_id !== id)[0]);
    } catch (err) {
      console.log(err);
    }
  },

  fetchRoomId: async (friend_id, callback) => {
    try {
      const { room_id } = await Apis.rooms.getRoomId(friend_id);

      callback(room_id);
    } catch (err) {
      console.log(err);
    }
  },

  leaveRoom: async (room_id) => {
    try {
      await Apis.rooms.leaveRoom(room_id);
    } catch (err) {
      console.log(err);
    }
  },
};

export default roomService;

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
};

export default roomService;

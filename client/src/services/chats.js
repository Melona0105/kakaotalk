import Apis from "../apis";

const chatService = {
  fetchRoomChats: async (room_id, callback) => {
    try {
      const { chats } = await Apis.chats.getChats(room_id);
      callback(chats);
    } catch (err) {
      throw err;
    }
  },
};

export default chatService;

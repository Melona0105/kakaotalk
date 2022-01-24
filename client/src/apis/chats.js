import axiosInstance from "./axios";

const chatApis = {
  getChats: async (room_id) => {
    const result = await axiosInstance({
      method: "GET",
      url: `/chats/${room_id}`,
    });

    return result.data;
  },
};

export default chatApis;

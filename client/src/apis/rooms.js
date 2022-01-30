import axiosInstance from "./axios";

const roomApis = {
  getRoomInfo: async (room_id) => {
    const result = await axiosInstance({
      method: "GET",
      url: `/rooms/info/${room_id}`,
    });

    return result.data;
  },

  getRoomId: async (friend_id) => {
    const result = await axiosInstance({
      method: "GET",
      url: `/rooms/${friend_id}`,
    });

    return result.data;
  },

  leaveRoom: async (room_id) => {
    const result = await axiosInstance({
      method: "PUT",
      url: `/rooms`,
      data: { room_id },
    });

    return result.data;
  },
};

export default roomApis;

import axiosInstance from "./axios";

const roomApis = {
  getRoomInfo: async (room_id) => {
    const result = await axiosInstance({
      method: "GET",
      url: `/rooms/info/${room_id}`,
    });

    return result.data;
  },
};

export default roomApis;

import axiosInstance from "./axios";

const friendApis = {
  findFriend: async (friendEmail) => {
    const result = await axiosInstance({
      method: "GET",
      url: `/friends/${friendEmail}`,
    });
    return result;
  },

  addFriend: async (friendInfo) => {
    const result = await axiosInstance({
      method: "PUT",
      url: "/friends",
      data: { friendInfo },
    });
    return result.data;
  },
};

export default friendApis;

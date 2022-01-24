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

  rollbackFriend: async (username) => {
    const result = await axiosInstance({
      method: "PUT",
      url: "/friends/rollback",
      data: { username },
    });
    return result.data;
  },

  blockFriend: async (username) => {
    const result = await axiosInstance({
      method: "PUT",
      url: "/friends/block",
      data: { username },
    });
    return result.data;
  },

  hideFriend: async (username) => {
    const result = await axiosInstance({
      method: "PUT",
      url: "/friends/hide",
      data: { username },
    });
    return result.data;
  },

  deleteFriend: async (username) => {
    const result = await axiosInstance({
      method: "DELETE",
      url: "/friends",
      data: { username },
    });
    return result.data;
  },
};

export default friendApis;

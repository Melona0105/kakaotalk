import axiosInstance from "./axios";

const userApis = {
  login: async (email, password) => {
    const result = await axiosInstance({
      method: "POST",
      url: "/users/login",
      data: { email, password },
      withCredentials: true,
    });

    const { accessToken } = result.data;
    return accessToken;
  },

  checkEmail: async (email) => {
    const result = await axiosInstance({
      method: "POST",
      url: "/users/email",
      data: { email },
    });

    return result;
  },

  getUserInfo: async () => {
    const result = await axiosInstance({
      method: "GET",
      url: "/users/userinfo",
    });

    return result.data.userInfo;
  },

  getFriends: async () => {
    const result = await axiosInstance({
      method: "GET",
      url: "/users/friends",
    });

    return result.data;
  },

  getRooms: async () => {
    const result = await axiosInstance({
      method: "GET",
      url: "/users/rooms",
    });
    return result.data;
  },

  editUsername: async (username) => {
    const result = await axiosInstance({
      method: "PUT",
      url: "/users/username",
      data: { username },
    });

    return result.data;
  },
};

export default userApis;

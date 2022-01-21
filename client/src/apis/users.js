import axiosInstance from "./axios";
const headers = { authorization: `Bearer ${localStorage.getItem("token")}` };

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

  userInfo: async () => {
    const result = await axiosInstance({
      method: "GET",
      url: "/users/userinfo",
      headers,
    });

    return result.data;
  },

  getFriends: async () => {
    const result = await axiosInstance({
      method: "GET",
      url: "/users/friends",
      headers,
    });

    return result.data;
  },

  getRooms: async () => {
    const result = await axiosInstance({
      method: "GET",
      url: "/users/rooms",
      headers,
    });

    return result.data;
  },

  // signUp: async (email, username, password, userbirth, agreements) => {
  //   const result = await axiosInstance({
  //     method: "POST",
  //     url: "/users/signup",
  //     withCredentials: true,
  //     data: { email, username, password, userbirth, agreements },
  //   });

  //   return result;
  // },
};

export default userApis;

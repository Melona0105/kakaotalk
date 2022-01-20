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
    }).then((res) => res);

    return result;
  },
};

export default userApis;

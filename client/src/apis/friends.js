import axiosInstance from "./axios";

const friendApis = {
  getFriends: async (email) => {
    const result = await axiosInstance({
      method: "POST",
      url: "/friends",
      data: { email },
    });

    return result.data;
  },
};

export default friendApis;

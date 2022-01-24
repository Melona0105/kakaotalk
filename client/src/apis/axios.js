import axios from "axios";

// const axiosInstance = axios.create({ baseURL: "http://localhost:4000" });
const axiosInstance = axios.create({
  baseURL: "http://ec2-3-36-51-139.ap-northeast-2.compute.amazonaws.com",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosInstance;

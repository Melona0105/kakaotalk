import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4000" });

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosInstance;

import axios from "axios";
import { server } from "../utils";

const axiosInstance = axios.create({ baseURL: server });

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosInstance;

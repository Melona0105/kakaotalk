import axios from "axios";
import { server } from "../utils";

const axiosInstance = axios.create({ baseURL: server });
// const axiosInstance = axios.create({
//   baseURL: "http://ec2-3-36-51-139.ap-northeast-2.compute.amazonaws.com:8080",
// });

axiosInstance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default axiosInstance;

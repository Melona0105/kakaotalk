import { io } from "socket.io-client";

// const client = io("http://localhost:80/");
const client = io(
  "http://ec2-3-36-51-139.ap-northeast-2.compute.amazonaws.com"
);

export default client;

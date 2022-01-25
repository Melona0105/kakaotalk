import { io } from "socket.io-client";

const client = io("http://localhost:8080/");
// const client = io(
//   "http://ec2-3-36-51-139.ap-northeast-2.compute.amazonaws.com:8080"
// );

client.on("connect", () => {
  console.log("연결됨");
});
export default client;

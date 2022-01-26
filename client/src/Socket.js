import { io } from "socket.io-client";
import { server } from "./utils";

const client = io(server);

client.on("connect", () => {
  // console.log("연결됨");
});
export default client;

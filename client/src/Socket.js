import { io } from "socket.io-client";

const client = io("http://localhost:4000");

export default client;

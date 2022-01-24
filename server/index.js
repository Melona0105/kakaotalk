const express = require("express");
const app = require("./app");
const { createServer } = require("http");
const Server = require("./controllers/chat/sendChatWebSocket");

const port = 80;

const httpServer = createServer(app);

// Server(httpServer);
Server("http://ec2-3-36-51-139.ap-northeast-2.compute.amazonaws.com"); // EC2
httpServer.listen(port, () => {
  console.log("서버 연결");
});

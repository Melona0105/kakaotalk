const express = require("express");
const app = require("./app");
const { createServer } = require("http");
const Server = require("./controllers/chat/sendChatWebSocket");

const port = 8080;

const httpServer = createServer(app);

Server(httpServer);

httpServer.listen(port, () => {
  console.log("서버 연결");
});

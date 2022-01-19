const express = require("express");
const app = require("./app");
const { createServer } = require("http");
const Server = require("./controllers/chat/sendChatWebSocket");

const port = 4000;

const httpServer = createServer(app);

Server(httpServer);

// app.listen(port, () => {
//   console.log(`${port}번으로 연결되었습니다.`);
// });
httpServer.listen(port, () => {
  console.log("서버 연결");
});

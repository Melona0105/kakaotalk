const express = require("express");
const app = require("./app");
const http = require("http");
const WebSocket = require("./socket");
require("dotenv").config();

const port = 4000;

const server = http.createServer(app).listen(port, () => {
  console.log(`express에서 ${port}번으로 연결되었습니다.`);
});

WebSocket(server);

// app.listen(port, () => {
//   console.log(`${port}번으로 연결되었습니다.`);
// });

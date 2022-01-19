const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true, // 브라우저들이 응답을 프론트앤드에 노출할지 옵션
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);

app.use(express.json()); // req.body로 접근가능

// '/'로 진입하면 라우터로 보낸다.
app.use("/", router);

module.exports = app;

const express = require("express");
const cors = require("cors");
const router = require("./routes");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true, // 브라우저들이 응답을 프론트앤드에 노출할지 옵션
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);

app.use(express.json()); // req.body로 접근가능
app.use(express.static(path.join(__dirname, "public")));
// '/'로 진입하면 라우터로 보낸다.
app.use("/", router);

module.exports = app;

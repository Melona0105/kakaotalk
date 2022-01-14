const express = require("express");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`${port}번으로 연결되었습니다.`);
});

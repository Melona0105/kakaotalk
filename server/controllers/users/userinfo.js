require("dotenv").config();
// const { User } = require("../../models");

module.exports = async function userinfo(req, res) {
  const { userInfo } = req;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    return res.status(201).send({ userInfo, message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

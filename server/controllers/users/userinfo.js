const { User } = require("../../models");
require("dotenv").config();

module.exports = async function userinfo(req, res) {
  const email = req.token;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    const userInfo = await User.findOne({ where: { email } }).then(
      (res) => res.dataValues
    );

    // 비밀번호 지우고 줌
    delete userInfo.password;
    return res.status(201).send({ data: userInfo, message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

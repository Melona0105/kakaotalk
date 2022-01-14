const { User } = require("../../models");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function login(req, res) {
  const { email, password } = req.body;
  // 입력한 이메일에 해당하는 유저정보가 있는지 확인
  const userInfo = await User.findOne({ where: { email } });
  console.log(userInfo);
  // 없으면 에러
  if (!userInfo) {
    return res.status(401).send({ message: "Please, check your email" });
  }

  // 있으면 비밀번호 확인
  const isValidPassword = await compare(password, userInfo.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: "Please, check your password" });
  }

  // 유저정보가 있고, 비밀번호까지 일치하면, 토큰을 반환한다.
  const accessToken = createAccessToken({ email: userInfo.email });

  return res
    .status(200)
    .json({ accessToken, userInfo: { email: userInfo.email }, message: "ok" });
};

function createAccessToken(data) {
  return sign({ data }, process.env.ACCESS_SECRET, { expiresIn: "1d" });
}

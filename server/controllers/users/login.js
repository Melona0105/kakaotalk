const db = require("../../database/");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function login(req, res) {
  const { email, password } = req.body;
  // 입력한 이메일에 해당하는 유저정보가 있는지 확인
  // TODO : 아이디 대소문자 구분 해주기
  console.log("11");
  console.log(email, password);
  try {
    const data = await new Promise((res, rej) => {
      db.query(
        `SELECT * FROM users WHERE users.email="${email}" `,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });
    const userInfo = data[0];
    if (!userInfo) {
      return res.status(401).send({ message: "Please, check your email" });
    }

    // 이메일이 맞을경우, 비밀번호 확인
    const isValidPassword = await compare(password, userInfo.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "Please, check your password" });
    }
    // 비밀번호 삭제
    delete userInfo.password;
    const accessToken = createAccessToken(userInfo);
    // 비밀번호도 맞으면, 유저정보를 꺼내준다.
    return res.status(201).send({ accessToken });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

function createAccessToken(data) {
  return sign({ data }, process.env.ACCESS_SECRET, { expiresIn: "1d" });
}

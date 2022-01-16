const { User } = require("../../models");
const { hash } = require("bcrypt");
const bcryptSaltRounds = 12;

module.exports = async function signup(req, res) {
  const { email, password, username, userBirth, music, comment, photo } =
    req.body;
  const userInfo = await User.findOne({ where: { username } });
  // 이미 가입된 계정인지 확인한다.
  if (userInfo) {
    return res.status(401).send({ message: `${email} is already exists.` });
  }

  // 가입되지않은경우, 암호화해서 서버에 저장한다
  try {
    const encrypted = await hash(password, bcryptSaltRounds);
    console.log("비밀번호 생성!");
    await User.create({
      email,
      password: encrypted,
      username,
      userBirth,
    });
    return res.status(201).send({ message: "Join!" });
  } catch {
    con;
    return res.status(500).send({ message: "Unexpected server error." });
  }
};

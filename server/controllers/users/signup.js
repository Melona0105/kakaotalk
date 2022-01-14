const { User } = require("../../models");
const { hash } = require("bcrypt");
const bcryptSaltRounds = 12;

module.exports = async function signup(req, res) {
  const { email, password, username, userBirth, song, comment, photo } =
    req.body;
  const userInfo = await User.findOne({ where: { email } });
  // 이미 가입된 계정인지 확인한다.
  if (userInfo) {
    // 이미 가입된 계정일경우, 클라이언트에러
    return res.status(401).send({ message: `${email} is already exists.` });
  }

  // 가입되지않은경우, 암호화해서 서버에 저장한다
  try {
    const encrypted = await hash(password, bcryptSaltRounds);
    console.log(1);
    await User.create({
      email,
      password: encrypted,
      username,
      userBirth,
      song,
      comment,
      photo,
    });
    return res.status(201).send({ message: "Join!" });
  } catch {
    con;
    return res.status(500).send({ message: "Unexpected server error." });
  }
};

const { connection } = require("../../database");
const { hash } = require("bcrypt");
const bcryptSaltRounds = 12;

module.exports = async function signup(req, res) {
  const { email, password, username, userBirth, music, comment, photo } =
    req.body;
  // const userInfo = await User.findOne({ where: { email } });
  const userInfo = await connection.query(
    `select * from users where email=${email}`,
    (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    }
  );
  // 이미 가입된 계정인지 확인한다.
  if (userInfo) {
    // 이미 가입된 계정일경우, 클라이언트에러
    return res.status(401).send({ message: `${email} is already exists.` });
  }

  // 가입되지않은경우, 암호화해서 서버에 저장한다
  try {
    const encrypted = await hash(password, bcryptSaltRounds);
    console.log("비밀번호 생성!");
    await connection.query().create({
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

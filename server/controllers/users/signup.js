// const { User } = require("../../models");
const db = require("../../database/");
const { hash } = require("bcrypt");
const bcryptSaltRounds = 12;

module.exports = async function signup(req, res) {
  const { email, password, username, userBirth } = req.body;
  // const userInfo = await User.findOne({ where: { username } });
  try {
    // 이미 가입된 계정인지 확인한다.
    db.query(
      `select * from users where email="${email}"`,
      async (err, result1) => {
        if (err) {
          throw err;
        }

        const userInfo = result1[0];
        // 데이터가 존재하면, 이미 있는 이메일 (이미 가입)
        if (userInfo) {
          return res.status(401).send({ message: "Already exists" });
        }

        // 데이터가 존재하지 않으면 (가입되지 않은경우, 암호화해서 저장)
        const encrypted = await hash(password, bcryptSaltRounds);

        db.query(
          `insert into users (email, password, username, userBirth) VALUES ("${email}", "${encrypted}", "${username}", "${userBirth}")`,
          (err, result2) => {
            if (err) {
              throw err;
            }
            return res.status(201).send({ message: "Welcome!" });
          }
        );
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

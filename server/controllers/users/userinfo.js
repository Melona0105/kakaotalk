const db = require("../../database/");

module.exports = async function userinfo(req, res) {
  const { id } = req.userInfo;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    db.query(`select * from Users where Users.id="${id}"`, (err, result) => {
      if (err) {
        throw err;
      }
      delete result.password;
      console.log(result);
      return res.status(201).send({ userInfo: result[0], message: "ok" });
    });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

const db = require("../../database/");

module.exports = async function userinfo(req, res) {
  const { id } = req.userInfo;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    const data = await new Promise((res, rej) => {
      db.query(`select * from users where users.id="${id}"`, (err, result) => {
        if (err) {
          return rej(err);
        }
        return res(result);
      });
    });
    return res.status(201).send({ userInfo: data[0], message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

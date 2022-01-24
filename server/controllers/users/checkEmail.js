const db = require("../../database/");

module.exports = async function checkEmail(req, res) {
  const { email } = req.body;
  try {
    const data = await new Promise((res, rej) => {
      db.query(`select * from users where email="${email}"`, (err, result) => {
        if (err) {
          return rej(err);
        } else {
          return res(result);
        }
      });
    });
    const userInfo = data[0];

    // 이메일이 존재하면  401
    if (userInfo) {
      return res.status(401).send({ message: `${email} is already exists.` });
    } else {
      // 존재하지않으면 가능하니까 201
      return res.status(201).send({ message: `${email} is available.` });
    }
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

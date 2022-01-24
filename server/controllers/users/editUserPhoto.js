// const { User } = require("../../models");
const db = require("../../database");

module.exports = async function editUserPhoto(req, res) {
  const { id } = req.userInfo;
  const { path } = req.file;

  try {
    // 경로가 존재하지않으면 데이터가 안 넘어온것 ->
    if (!path) {
      return res.status(401).send();
    }

    const file = path.split("public/")[1];
    await new Promise((res, rej) => {
      db.query(
        `UPDATE users SET photo = "${file}" where users.id = "${id}"`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });
    return res.status(201).send();
  } catch {
    return res.status(500).send({ message: "Unexpected server error." });
  }
};

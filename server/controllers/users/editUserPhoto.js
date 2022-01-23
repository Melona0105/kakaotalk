// const { User } = require("../../models");
const db = require("../../database");

module.exports = async function editUserPhoto(req, res) {
  const { id } = req.userInfo;
  console.log(req.file);
  const { path } = req.file;
  try {
    // 경로가 존재하지않으면 데이터가 안 넘어온것 ->
    if (!path) {
      return res.status(401).send();
    }
    db.query(
      `UPDATE Users SET photo = "${path}" where users.id = "${id}"`,
      (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).send();
      }
    );
  } catch {
    return res.status(500).send({ message: "Unexpected server error." });
  }
};

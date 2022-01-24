const db = require("../../database");

module.exports = async function editUserName(req, res) {
  const { id } = req.userInfo;
  const { username } = req.body;
  try {
    await new Promise((res, rej) => {
      db.query(
        `UPDATE users as U set username="${username}" where U.id="${id}"`,
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
    return res.status(500).send({ message: "server error" });
  }
};

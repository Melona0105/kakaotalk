const db = require("../../database");

module.exports = async function username(req, res) {
  const { id } = req.userInfo;
  const { username } = req.body;
  try {
    db.query(
      `UPDATE Users as U set username="${username}" where U.id="${id}"`,
      (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).send();
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

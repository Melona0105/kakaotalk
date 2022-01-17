const db = require("../../database/");

module.exports = async function checkEmail(req, res) {
  const { email } = req.body;
  try {
    db.query(
      `select * from users where email="${email}"`,

      async (err, result) => {
        if (err) {
          throw err;
        }

        const userInfo = result[0];

        if (userInfo) {
          return res
            .status(401)
            .send({ message: `${email} is already exists.` });
        }
      }
    );
  } catch {
    return res.status(201).send({ message: `${email} is available.` });
  }
};

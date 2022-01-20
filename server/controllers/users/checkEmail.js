const db = require("../../database/");

module.exports = async function checkEmail(req, res) {
  const { email } = req.body;
  console.log(1);
  try {
    db.query(
      `select * from users where email="${email}"`,

      async (err, result) => {
        if (err) {
          throw err;
        }

        const userInfo = result[0];

        // 이메일이 존재하면  401
        if (userInfo) {
          return res
            .status(401)
            .send({ message: `${email} is already exists.` });
        } else {
          // 존재하지않으면 가능하니까 201
          return res.status(201).send({ message: `${email} is available.` });
        }
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

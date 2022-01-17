// const { User } = require("../../models");

module.exports = async function checkEmail(req, res) {
  const { email } = req.body;

  const userInfo = await User.findOne({ where: { email } });

  if (userInfo) {
    // 이미 가입된 계정일경우, 클라이언트에러
    return res.status(401).send({ message: `${email} is already exists.` });
  } else {
    return res.status(201).send({ message: `${email} is available.` });
  }
};

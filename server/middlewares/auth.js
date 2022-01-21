require("dotenv").config();
const { verify } = require("jsonwebtoken");
// 들어오는 요청을 중간에 토큰해독해서 정보를 넘겨준다.
module.exports = async function auth(req, res, next) {
  const { authorization } = req.headers;
  // 토큰이 존재하지 않으면
  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];
  // 토큰이 내용이 올바르지 않으면
  if (!token) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  // 토큰이 존재한다면, 토큰을 해독해서 데이터베이스에 찾아본다. -> 값이 있다면 데이터 넘겨주고 아니면 에러 떄림
  try {
    const userInfo = await getDataFromToken(token).then((res) => res.data);
    if (userInfo) {
      req.userInfo = userInfo;
      next();
    }
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

function getDataFromToken(token) {
  return new Promise((res, rej) => {
    verify(token, process.env.ACCESS_SECRET, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
}

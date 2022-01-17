require("dotenv").config();
const db = require("../../database/");

module.exports = async function getFriend(req, res) {
  const { id } = req.userInfo;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    // 배열로 나옴 이 아래정보는
    db.query(`select * from friends where user_id="${id}"`, (err, result1) => {
      if (err) {
        throw err;
      }

      const friendDataArray = result1;

      // 친구데이터가 없는 경우
      if (!friendDataArray.length) {
        return res.status(204).send();
      }

      // 친구 데이터가 있는 경우
      const friendData = [];
      for (let i = 0; i < friendDataArray.length; i++) {
        const firendId = friendDataArray[i].friend_id;
        db.query(
          `select * from Users where id="${firendId}"`,
          (err, result2) => {
            if (err) {
              throw err;
            }

            const data = result2[0];
            delete data.password;

            friendData.push(data);

            if (i === friendDataArray.length - 1) {
              return res.status(202).send({ friendData });
            }
          }
        );
      }
    });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

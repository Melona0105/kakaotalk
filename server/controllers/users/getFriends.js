require("dotenv").config();
const db = require("../../database");

module.exports = function getFriends(req, res) {
  const { id } = req.userInfo;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    // 배열로 나옴 이 아래정보는
    db.query(
      `select U.comment, U.email, U.id, 
      U.music, U.photo, U.userBirth, 
      U.username, F.status from Friends as F 
      LEFT JOIN Users as U ON F.friend_id=U.id 
      where user_id=${id}`,
      (err, result) => {
        if (err) {
          throw err;
        }
        // 친구데이터가 없는 경우
        if (!result.length) {
          return res.status(204).send();
        }

        // 친구 데이터가 있다면 돌려준다.
        return res.status(201).send(result);
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

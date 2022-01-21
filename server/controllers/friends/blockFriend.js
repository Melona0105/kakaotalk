const db = require("../../database");

module.exports = async function blockFriend(req, res) {
  const { id } = req.userInfo;
  const { username } = req.body;
  try {
    // 선택한 사람의 유저네임을 갖고, 내 아이로 친구인 사람을 찾는다.
    db.query(
      `SELECT F.friend_id from Users LEFT JOIN Friends as F
       ON users.id=F.friend_id
       where Users.username="${username}" and F.user_id="${id}"`,
      (err, result) => {
        if (err) {
          throw err;
        }
        // 친구목록에 없으면 에러 ->
        if (!result[0]) {
          return res.status(404).send({ message: "Already deleted" });
        }
        const { friend_id } = result[0];
        // 친구목록에 있으면 그 사람의 아이디를 차단한다.
        db.query(
          `UPDATE friends as F set status=2 where F.friend_id=${friend_id} and F.user_id=${id}`,
          (err, result2) => {
            if (err) {
              throw err;
            }
            // 성공적으로 삭제한 경우 201 리턴
            return res.status(201).send();
          }
        );
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

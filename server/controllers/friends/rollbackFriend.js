const db = require("../../database");

module.exports = async function rollbackFriend(req, res) {
  const { id } = req.userInfo;
  const { username } = req.body;
  try {
    // 선택한 사람의 유저네임을 갖고, 내 아이로 친구인 사람을 찾는다.
    const result1 = await new Promise((res, rej) => {
      db.query(
        `SELECT F.friend_id from users LEFT JOIN friends as F
         ON users.id=F.friend_id
         where users.username="${username}" and F.user_id="${id}"`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    // 친구목록에 없으면 에러 ->
    if (!result1[0]) {
      return res.status(404).send({ message: "Already deleted" });
    }
    const { friend_id } = result1[0];
    // 친구목록에 있으면 그 사람의 아이디를 원래대로 돌려준다.

    await new Promise((res, rej) => {
      db.query(
        `UPDATE friends as F set status=0 where F.friend_id=${friend_id} and F.user_id=${id}`,
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

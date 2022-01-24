const db = require("../../database");

module.exports = async function deleteFriend(req, res) {
  const { id } = req.userInfo;
  const { username } = req.body;
  try {
    // 선택한 사람의 유저네임을 갖고, 내 아이로 친구인 사람을 찾는다.
    const data = await new Promise((res, rej) => {
      db.query(
        `select F.friend_id from users LEFT JOIN friends as F
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
    if (!data[0]) {
      return res.status(404).send({ message: "Already deleted" });
    }
    const { friend_id } = data[0];
    // 친구목록에 있으면 그 사람의 아이디를 삭제한다.

    await new Promise((res, rej) => {
      db.query(
        `DELETE FROM Friends as F where F.friend_id="${friend_id}" AND F.user_id="${id}"`,
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

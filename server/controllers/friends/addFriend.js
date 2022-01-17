// const { User, Friend } = require("../../models");

const db = require("../../database");

module.exports = async function addFriend(req, res) {
  const { id } = req.userInfo;

  const { friendInfo } = req.body;
  // find에처 찾은 친구 정보를 보낸다.
  try {
    const friend_id = friendInfo.id;
    // 친구목록에 데이터를 삽입해준다.
    db.query(
      `insert into friends (user_id, friend_id) values (${id}, ${friend_id})`,
      (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).send({ message: "add friend" });
      }
    );
    // 그 후 그 데이터를 꺼내준다.
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

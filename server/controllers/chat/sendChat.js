// const { User, Friend } = require("../../models");

const db = require("../../database");

module.exports = async function addFriend(req, res) {
  const { id } = req.userInfo;
  const { content } = req.body;
  const { room_id } = req.params;
  const time = new Date().toLocaleString();
  // 방 아이디
  // 입력한 데이터를 날린다.
  // 필요한 데이터

  try {
    db.query(
      `INSERT INTO chats (user_id, content, room_id, view, time) VALUES ("${id}", "${content}", "${room_id}", "${0}", "${time}")`,
      (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).send();
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

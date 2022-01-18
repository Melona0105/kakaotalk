// const { User, Friend } = require("../../models");

const db = require("../../database");

module.exports = async function addFriend(req, res) {
  // 접속한 유저정보
  const { userInfo } = req;
  // 방 아이디
  const { room_id } = req.body;

  // 방이 없으면 방을 만든다.
  // 방 정보로 채팅을 주워온다.
  try {
    db.query(
      `select chats.id, chats.user_id, chats.content, chats.room_id, chats.view, chats.time, users.username from chats LEFT JOIN users ON chats.user_id = users.id where room_id=${room_id};`,
      (err, result) => {
        if (err) {
          throw err;
        }
        // 채팅이 있을 경우
        if (result.length) {
          return res.status(201).send({ chats: result });
        }
        /// 채팅이 없을 경우
        return res.status(203).send({ chats: [] });
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

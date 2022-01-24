// const { User, Friend } = require("../../models");

const db = require("../../database");

module.exports = async function addFriend(req, res) {
  // 접속한 유저정보
  const { id } = req.userInfo;
  // 방 아이디
  const { room_id } = req.params;

  // 방이 없으면 방을 만든다.
  // 방 정보로 채팅을 주워온다.

  try {
    // ? 이 때, 요청한 데이터가 내 아이디와 일치하지 않으면(남의 카톡이면) 읽은것으로 표시해주고 데이터 바꾸고

    await new Promise((res, rej) => {
      db.query(
        `UPDATE chats SET view = '0' WHERE user_id!=${id} AND room_id=${room_id}`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    const data = await new Promise((res, rej) => {
      db.query(
        `select chats.id, chats.user_id, chats.content, chats.room_id, chats.view, chats.time, users.username from chats 
        LEFT JOIN users ON chats.user_id = users.id 
        where room_id=${room_id};`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });
    // 채팅이 있을 경우
    if (data.length) {
      return res.status(201).send({ chats: data });
    }
    /// 채팅이 없을 경우
    return res.status(203).send({ chats: [] });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

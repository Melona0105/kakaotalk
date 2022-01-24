const db = require("../../database");

module.exports = async function getRoomId(req, res) {
  // 더블클릭하면, 현재 유저 아이디의 방과 + 클릭한 유저 아이디의 방중 같은 방이 있는지 찾는다.
  const user_id = req.userInfo.id;
  const { friend_id } = req.params;
  try {
    // 주어진 아이디에 해당하는 방들을 모두 가져온다.
    // 로그인한 사람의 방과 주어진 아이디에 해당하는 사람의 방중 같은 아이디를 찾는다.
    const result1 = await new Promise((res, rej) => {
      db.query(
        `select * from users_in_rooms as A 
      INNER JOIN users_in_rooms as B 
      where A.user_id='${user_id}' AND B.user_id=${friend_id} AND A.room_id = B.room_id`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    const userRoom = result1[0];
    // 방이 있다면 그 방으로 연결
    if (userRoom) {
      return res.status(201).send({ room_id: userRoom.room_id, message: "ok" });
    }

    // 방이 없다면, 새로 만들어서 서로 아이디에 그 방을 연결해주고 연결
    await new Promise((res, rej) => {
      db.query(`INSERT into rooms (noti) VALUES (0)`, (err, result) => {
        if (err) {
          return rej(err);
        } else {
          return res(result);
        }
      });
    });

    // 새 방 생성됨

    // 새 방의 id값 어떻게 주워 올것?
    // 추가하고, 현재의 id를 다른 방에 추가한다.
    const result2 = await new Promise((res, rej) => {
      db.query(`select id from rooms`, (err, result) => {
        if (err) {
          return rej(err);
        } else {
          return res(result);
        }
      });
    });

    const room_id = result2[result2.length - 1];

    await new Promise((res, rej) => {
      db.query(
        `INSERT into users_in_rooms (user_id, room_id) VALUES (${user_id}, ${room_id.id})`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    await new Promise((res, rej) => {
      db.query(
        `INSERT into users_in_rooms (user_id, room_id) VALUES (${friend_id}, ${room_id.id})`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    return res.status(201).send({ room_id: room_id.id });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

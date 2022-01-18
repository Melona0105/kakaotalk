const db = require("../../database");

module.exports = async function getRoomInfo(req, res) {
  // 로그인한 사람의 유저아이디
  const user_id = req.userInfo.id;
  // 주어진 방 번호
  const { room_id } = req.body;

  console.log("헤헷");
  try {
    db.query(
      `select * from Users LEFT JOIN users_in_rooms ON users_in_rooms.user_id=Users.id where room_id=${room_id}`,
      (err, result) => {
        if (err) {
          throw err;
        }

        for (let i = 0; i < result.length; i++) {
          delete result[i].password;
        }
        const data = result;
        return res.status(201).send({ roomInfo: data });
      }
    );

    // 방 번호에 해당하는 사람의 유저정보를 추출해준다.
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

const db = require("../../database");

module.exports = function getRoomInfo(req, res) {
  // 로그인한 사람의 유저아이디
  const user_id = req.userInfo.id;
  // 주어진 방 번호

  const { room_id } = req.params;
  try {
    db.query(
      `select U.id, U.email, U.username, U.photo, F.status from Users as U
      LEFT JOIN users_in_rooms as UR ON UR.user_id=U.id
      left join friends as F ON F.friend_id=U.id
      where room_id="${room_id}" and U.id!="${user_id}"`,
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

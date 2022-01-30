const db = require("../../database");

module.exports = async function leaveRoom(req, res) {
  const { id } = req.userInfo;
  const { room_id } = req.body;
  try {
    // 현재 사용자가 아니고, 선택한 방의 status를 1로 만들어버린다.
    await new Promise((res, rej) => {
      db.query(
        `UPDATE users_in_rooms SET status=1 WHERE room_id="${room_id}" and user_id!="${id}"`,
        (err, result) => {
          if (err) {
            console.log(err);
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

const db = require("../../database/");

module.exports = async function getFriendInfo(req, res) {
  const { friend_id } = req.params;
  try {
    // 주어진 친구 유저에 대한 정보들을 준다
    const queryResult = await new Promise((res, rej) => {
      db.query(
        `SELECT U.username, U.photo 
        From users as U where U.id="${friend_id}"`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });
    const data = queryResult[0];
    if (!data) {
      return res.status(404).send();
    }

    return res.status(201).send({ data });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};

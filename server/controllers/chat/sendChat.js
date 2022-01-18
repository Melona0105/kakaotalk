// const { User, Friend } = require("../../models");

const db = require("../../database");

module.exports = async function addFriend(req, res) {
  const { id } = req.userInfo;
  const { content } = req.body;
  const { room_id } = req.params;
  // 현재시각 아래 포맷으로 2020-01-19 02:34
  const time = getCurrentTime();
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

function getCurrentTime() {
  const date = new Date().toLocaleDateString().split(" ");
  const time = new Date().toLocaleTimeString().split(" ");

  const year = date[0].slice(0, -1);
  const month = date[1].slice(0, -1).padStart(2, 0);
  const day = date[2].slice(0, -1).padStart(2, 0);

  const hour =
    time[0] === "오후"
      ? +time[1].split(":")[0] + 12
      : time[1].split(":")[0].padStart(2, 0);

  const min = time[1].split(":")[1];
  return `${year}-${month}-${day} ${hour}:${min}`;
}

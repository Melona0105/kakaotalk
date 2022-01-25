const { Server } = require("socket.io");
const db = require("../../database");

module.exports = async (server) => {
  // express 서버와 연결
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", async (socket) => {
    console.log("서버와연결");
    io.emit("connection", "서버에 연결되었습니다.");
    socket.on("message", async (newdata) => {
      try {
        // 방 번호와, 채팅 내역
        const { room_id, newMsg } = newdata;
        const { user_id, content } = newMsg;

        await new Promise((res, rej) => {
          db.query(
            `INSERT INTO chats (user_id, content, room_id, view, time) 
             VALUES ("${user_id}", "${content}", "${room_id}", "${1}", "${getCurrentTime()}")`,
            (err, result) => {
              if (err) {
                return rej(err);
              } else {
                return res(result);
              }
            }
          );
        });
        // 성공하면 데이터를 돌려준다.
        io.emit("message", newMsg);
      } catch (err) {
        console.log(err);
      }
      // 이 공간에 이제 db 쿼리 작성
    });

    socket.on("friends", (data) => {
      io.emit("friends", "data");
    });

    socket.on("birth", (data) => {
      io.emit("birth", "data");
    });
  });
};

function getCurrentTime() {
  const date = new Date().toISOString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  const hour = date.slice(11, 13);

  const min = date.slice(14, 16);
  const second = date.slice(17, 19);

  return `${year}-${month}-${day} ${hour}:${min}:${second}`;
}

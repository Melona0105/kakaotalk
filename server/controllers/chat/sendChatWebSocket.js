const { Server } = require("socket.io");
const db = require("../../database");

module.exports = async (server) => {
  // express 서버와 연결
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
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
  const date = new Date().toLocaleDateString().split(" ");
  const time = new Date().toLocaleTimeString().split(" ");

  const year = date[0].slice(0, -1);
  const month = date[1].slice(0, -1).padStart(2, 0);
  const day = date[2].slice(0, -1).padStart(2, 0);

  let hour =
    time[0] === "오후"
      ? +time[1].split(":")[0] + 12
      : time[1].split(":")[0].padStart(2, 0);

  if (hour === 24) {
    hour = 12;
  }
  const min = time[1].split(":")[1];
  const second = time[1].split(":")[2];
  return `${year}-${month}-${day} ${hour}:${min}:${second}`;
}

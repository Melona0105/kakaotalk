const WebSocket = require("ws");

module.exports = (server) => {
  // express 서버와 연결
  const wss = new WebSocket.Server({ server, path: "/chats" });

  // 웹 소켓 연결시
  wss.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", (message) => {
      // 클라이언트로부터 메시지
      console.log(message.toString());
    });
    ws.on("error", (error) => {
      // 에러 시
      console.error(error);
    });
    ws.on("close", () => {
      // 연결 종료 시
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    // * A가 서버에 데이터를 보내면, 서버에서는 B,A에게 둘다 데이터를 돌려준다. --> 기본원리

    ws.interval = setInterval(() => {
      // 3초마다 클라이언트로 메시지 전송 - 열려있을 경우..
      if (ws.readyState === ws.OPEN) {
        // 메시지를 전송하는 send 받을때는 On
        ws.send("서버에서 클라이언트로 메시지를 보냅니다.");
      }
    }, 3000);
  });
};

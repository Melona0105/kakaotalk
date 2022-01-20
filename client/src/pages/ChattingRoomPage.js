import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function ChattingPage({
  isNewData,
  roomData,
  countNewMsg,
  setIsNewData,
}) {
  const { room_id, newMsg } = useSelector((state) => state.NewMessageReducer);
  const { currentPage } = useSelector((state) => state.CurrentPageReducer);
  // TODO : 메세지 변화를 리덕스에 넣고, 그거 바뀌면 전부다 알림이 새로고침 되도록 하기
  const socketRef = useRef();

  // 데이터가 들어오면, 새로 렌더링을 하고, -- > 데이터에 종속시키면 될듯

  useEffect(() => {
    // 소켓이 존재하지 않으면, 소켓을 열어준다.
    const client = io("http://localhost:4000");
    client.on("connect", () => {
      // console.log("connected");12
    });
    client.on("disconnect", () => {
      console.log("discoonected");
    });
    client.on("message", (message) => {
      // 여기도 socket 연결을 해놓고, 새로 데이터가 올때마다 새로 렌더링한다.
      setIsNewData(!isNewData);
    });
    socketRef.current = client;
    return () => {
      client.removeAllListeners();
    };
  }, [isNewData, currentPage]);

  useEffect(() => {
    if (room_id) {
      for (let i = 0; i < roomData.length; i++) {
        const now = roomData[i];
        now.view = newMsg;
      }
    }
  }, [isNewData]);

  // 현재 배열에 새 데이터값을 합친다. 어떻게?
  return (
    <div className="chatting-page-container">
      <RommPageNav />
      <div className="chatting-page-content">
        {roomData.map((el, idx) => (
          <Room key={el.username} data={el} view={countNewMsg[idx]} />
        ))}
      </div>
    </div>
  );
}

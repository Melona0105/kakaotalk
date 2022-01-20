import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function ChattingPage({ isNewData, roomData, setIsNewData }) {
  const { currentPage } = useSelector((state) => state.CurrentPageReducer);
  // * TODO : 메세지 변화를 리덕스에 넣고, 그거 바뀌면 전부다 알림이 새로고침 되도록 하기 --- OK
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

  // 현재 배열에 새 데이터값을 합친다. 어떻게?
  // 항상 포문돌리는건 나중에 한번씩 보면서 어떻게 포문말고 다른거로 할지 고민해보기
  return (
    <div className="chatting-page-container">
      <RommPageNav />
      <div className="chatting-page-content">
        {roomData.length ? (
          roomData.map((el) => <Room key={el.username} data={el} />)
        ) : (
          <div className="chatting-page-blank">
            <div>아직 대화가 없어요.</div>
            <div>새로운 대화를 시작해보세요.</div>
          </div>
        )}
        {}
      </div>
    </div>
  );
}

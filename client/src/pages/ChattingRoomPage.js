import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

export default function ChattingPage() {
  const { id } = useSelector((state) => state.UserInfoReducer);
  const { isMsgChange } = useSelector((state) => state.MsgChangeReducer);
  const { room_id, newMsg } = useSelector((state) => state.NewMessageReducer);
  const [roomData, setRoomData] = useState([]);
  const [isNewData, setIsNewData] = useState(false);
  const [countNewMsg, setCountNewMsg] = useState([]);
  // TODO : 메세지 변화를 리덕스에 넣고, 그거 바뀌면 전부다 알림이 새로고침 되도록 하기
  const socketRef = useRef();

  useEffect(async () => {
    const { rooms } = await axios({
      method: "GET",
      url: "http://localhost:4000/users/rooms",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.data);
    const result = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i]) {
        result.push(rooms[i]);
      }
    }
    setCountNewMsg(getNewMessage(result));
    // setCountNewMsg(result.filter((el) => el.view === 1).length);
    getRoomDataFromServer(result);
  }, [isNewData, isMsgChange]);

  // 들어온 데이터 안의 배열들을 순회하면서 거기서 일치하는 값을 뽑아낸다.
  function getNewMessage(array) {
    const answer = [];
    for (let i = 0; i < array.length; i++) {
      const now = array[i];
      answer.push(now.filter((el) => el.user_id !== id && el.view).length);
    }
    return answer;
  }

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
  }, [isNewData]);

  useEffect(() => {
    if (room_id) {
      for (let i = 0; i < roomData.length; i++) {
        const now = roomData[i];
        now.view = newMsg;
      }
    }
  }, [isNewData]);

  function getRoomDataFromServer(serverData) {
    const data = [];
    for (let i = 0; i < serverData.length; i++) {
      const now = serverData[i];
      data.push(now[now.length - 1]);
    }
    data.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    setRoomData(data);
  }

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

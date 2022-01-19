import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ChattingPage() {
  const { id } = useSelector((state) => state.UserInfoReducer);
  // const { messageLength } = useSelector((state) => state.NewMessageReducer);
  // ? 메시지 데이터에서 읽었는지, 아닌지 여부를 판단
  // ? 그 개수를 넘겨줘서 새 메세지 수를 파악해야 할듯함.
  const [roomData, setRoomData] = useState([]);
  // 여기서 넘어오는 오리지날 데이터에서 소팅된 개수들을 적어놓는다.
  // TODO : 무엇을 수정해줘야 채팅들이 바뀌면, 채팅방도 바뀔까?

  // 리덕스에 누른 데이터의 배열의 길이를 받아오게한 뒤, 배열으 ㅣ길이가 바뀌면 아래 함수가 다시 실행되게?
  const [original, setOriginal] = useState([]);
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
    setOriginal(result);
    getRoomDataFromServer(result);
  }, []);

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

  function getNewDataCount(data) {
    const counts = [];
    // 순회하면서 user_id가 로그인 한 사람이 아니고, view가 1인 개수만 모음
    for (let i = 0; i < data.length; i++) {
      const now = data[i];
      for (let j = 0; j < now.length; j++) {
        // ! 새로 쿼리를 보내서, 채팅내역중 view가 1인것만 꺼내오는게 빠르려나? --> 내일 고민해보기
      }
    }
  }
  return (
    <div className="chatting-page-container">
      <RommPageNav />
      <div className="chatting-page-content">
        {roomData.map((el) => (
          <Room key={el.username} data={el} />
        ))}
      </div>
    </div>
  );
}

import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChattingPage() {
  // ? 메시지 데이터에서 읽었는지, 아닌지 여부를 판단
  // ? 그 개수를 넘겨줘서 새 메세지 수를 파악해야 할듯함.
  const [roomData, setRoomData] = useState([]);

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
    setRoomData(
      result.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      })
    );
  }, []);

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

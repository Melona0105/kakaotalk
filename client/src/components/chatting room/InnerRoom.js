import imoticon from "../../images/chatting/imoticon.png";
import upload from "../../images/chatting/upload.png";
import schedule from "../../images/chatting/schedule.png";
import face_talk from "../../images/chatting/face talk.png";
import voice_talk from "../../images/chatting/voice talk.png";
import "../../css/components/chatting room/InnerRoom.css";
import user from "../../images/friend/user1.png";
import Chatting from "./chattings/Chatting";
import { useParams } from "react-router-dom";
import InnerRoomNav from "./InnerRoomNav";
import { sortChatData } from "../../functions";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function InnerRoom() {
  // 현재 대화하는 사람의 데이터 이거 받아와서 넣어줘야함
  // 이 룸 아이디로 채팅데이터가져온다.
  const { room_id } = useParams();
  const [currentChat, setCurrentChat] = useState([]);
  const [roomData, setRoomData] = useState({});
  const { id } = useSelector((state) => state.UserInfoReducer);
  const [message, setMessage] = useState("");
  const [isMessageFill, setIsMessageFill] = useState(false);

  // 데이터를 전송하고, 성공적으로 전송했다면, 칸을 비워준다.
  async function sendMessageToServer() {
    try {
      await axios({
        method: "POST",
        url: `http://localhost:4000/chats/${room_id}`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { content: message },
      }).then((res) => res.data);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (message) {
      setIsMessageFill(true);
    } else {
      setIsMessageFill(false);
    }
  }, [message]);

  useEffect(async () => {
    // 채팅 내용들을 가져오는 함수
    try {
      const { chats } = await axios({
        method: "POST",
        url: "http://localhost:4000/chats",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { room_id },
      }).then((res) => res.data);
      setCurrentChat(chats);
    } catch (err) {
      console.log(err);
    }
  }, [isMessageFill]);

  useEffect(async () => {
    // 방 주인의 데이터를 가져오는 함수
    try {
      const { roomInfo } = await axios({
        method: "POST",
        url: "http://localhost:4000/rooms/info",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { room_id },
      }).then((res) => res.data);
      setRoomData(roomInfo.filter((el) => el.user_id !== id)[0]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const sortedData = sortChatData(currentChat);

  // 유저로 필터링해서, 상대방이면 왼쪽에 나면 오른쪽에 뿌린다.
  // 각각을 컴포넌트화 하는게 좋을듯
  // 데이터를 같은 사람 + 1분단위로 묶어서 정리 -> 이걸 뿌려준다.

  // TODO : 텍스트박스 안에 텍스트 위로 올려주기 CSS
  return (
    <div className="inner-room-container">
      <InnerRoomNav roomImg={user} roomData={roomData} />
      <div className="inner-room-container-body">
        <Chatting chattingData={sortedData} roomImg={user} />
      </div>
      <div className="inner-room-container-input">
        <div className="inner-room-input-nav">
          <div className="inner-room-input-nav-left">
            {[imoticon, upload, schedule].map((el) => (
              <img src={el} />
            ))}
          </div>
          <div className="inner-room-input-nav-right">
            {[voice_talk, face_talk].map((el) => (
              <img src={el} />
            ))}
          </div>
        </div>
        <div className="inner-room-input-area">
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && isMessageFill) {
                sendMessageToServer();
              }
            }}
          />
          <div className="send-button-container">
            {isMessageFill ? (
              <div
                className="send-button-on"
                onClick={() => {
                  sendMessageToServer();
                }}
              >
                전송
              </div>
            ) : (
              <div className="send-button-off">전송</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

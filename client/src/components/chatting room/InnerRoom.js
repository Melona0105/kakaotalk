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
  const { room_id } = useParams();
  const [currentChat, setCurrentChat] = useState([]);
  const [roomData, setRoomData] = useState({});
  const { id } = useSelector((state) => state.UserInfoReducer);
  // 이 룸 아이디로 채팅데이터가져온다.

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
  }, []);

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
  // TODO : 현재 채팅방의 룸 아이디로 채팅 데이터를 가져와야 함
  const roomdata = {
    id: 1,
    img: user, // 채팅방 사진
    username: "형범이형", // 채팅방 이름 ----- 앞에 친구목록에 있는 유저이름
    noti: true, // 알람 온오프
    time: "2022-01-10T21:00", // 메세지 시간
    message: "확인 부탁드립니다.", // 메세지 내용
    newMsg: false, // 새 메세지 여부
    newMsgCount: 0, // 새 메세지 개수
  };

  const sortedData = sortChatData(currentChat);

  // 유저로 필터링해서, 상대방이면 왼쪽에 나면 오른쪽에 뿌린다.
  // 각각을 컴포넌트화 하는게 좋을듯
  // 데이터를 같은 사람 + 1분단위로 묶어서 정리 -> 이걸 뿌려준다.

  // TODO : 텍스트박스 안에 텍스트 위로 올려주기
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
          <input />
          <div className="send-button-container">
            <div className="send-button">전송</div>
          </div>
        </div>
      </div>
    </div>
  );
}

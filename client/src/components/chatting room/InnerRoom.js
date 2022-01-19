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
import { printNewMsgTime, sortChatData, getCurrentTime } from "../../functions";
import axios from "axios";
import { useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";

export default function InnerRoom() {
  // 현재 대화하는 사람의 데이터 이거 받아와서 넣어줘야함
  // 이 룸 아이디로 채팅데이터가져온다.
  const { room_id } = useParams();
  const [currentChat, setCurrentChat] = useState([]);
  const [roomData, setRoomData] = useState({});
  const { id, username } = useSelector((state) => state.UserInfoReducer);
  const [message, setMessage] = useState("");
  const [isMessageFill, setIsMessageFill] = useState(false);
  let sortedData = sortChatData(currentChat);

  // 우선은 준걸 그대로 줘야 빠르게 되니 폼에 담아서 준다.
  const newMsg = {
    user_id: id,
    room_id,
    username,
    content: "123",
    time: getCurrentTime(),
    view: 1,
  };
  // 서버로 데이터를 전송하는 함수
  // ? 서버로 데이터를 전송하고, 그 후, 바뀐 데이터를 받아오는데
  // * 채팅에 그냥 room_id를 담아서 보내보자
  async function sendMsg(params) {
    const webSocket = new WebSocket("ws://localhost:4000/chats");
    newMsg.content = message;
    const sendData = { room_id, newMsg };
    // 웹소켓 개방
    webSocket.onopen = () => {
      console.log("데이터를 전송합니다.");
      webSocket.send(JSON.stringify(sendData));
    };
    webSocket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log(newData);
      insertServerData(newData);
      // 바로 데이터를 돌려주면, 이 데이터를 현재 출력중인 데이터에 푸쉬해서 추가적으로 뿌려지게 한다.
    };
    // 데이터 전송
    setMessage("");
  }

  function insertServerData(newChat) {
    // 웹소켓을 통해 서버로 부터 받아온 데이터를 추가해준다.
    const serverData = [...currentChat];
    serverData.push(newChat);
    setCurrentChat(serverData);
  }
  // 이것을 웹소켓을 이용하면
  // async function sendMessageToServer() {
  //   try {
  //     await axios({
  //       method: "POST",
  //       url: `http://localhost:4000/chats/${room_id}`,
  //       headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  //       data: { content: message },
  //     }).then((res) => res.data);
  //     setMessage("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    if (message) {
      setIsMessageFill(true);
    } else {
      setIsMessageFill(false);
    }
  }, [message]);

  useEffect(async () => {
    // 채팅 내용들을 가져오는 함수  처음에만 가져오고 다시들어오면 그때 넣어준다.
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

  // 채팅을 새로보내면 새로 렌더링하게 하는 함수
  useEffect(() => {
    sortedData = sortChatData(currentChat);
  }, [currentChat]);

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
                sendMsg();
              }
            }}
          />
          <div className="send-button-container">
            {isMessageFill ? (
              <div
                className="send-button-on"
                onClick={() => {
                  sendMsg();
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

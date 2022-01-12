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

export default function InnerRoom() {
  const { roomId } = useParams();
  console.log(roomId);
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

  const { id, img, username, noti, time, message, newMsg, newMsgCount } =
    roomdata;

  const chatData = [
    {
      id: 1,
      user: "형범이형", // 유저아이디 -> 이거에 해당하는 이름으로 출력해줘야함
      content: "묻지마셈ㅋㅋ",
      time: "2022-01-12T01:02",
      read: true,
    },
    {
      id: 2,
      user: "me",
      content: "ㅡㅡ",
      time: "2022-01-12T01:02",
      read: true,
    },
    {
      id: 3,
      user: "me",
      content: "오키",
      time: "2022-01-12T01:02",
      read: true,
    },
    {
      id: 4,
      user: "me",
      content: "ㅎㅎ",
      time: "2022-01-12T01:02",
      read: true,
    },
    {
      id: 6,
      user: "형범이형",
      content: "잘했네 보니까",
      time: "2022-01-12T01:03",
      read: true,
    },
    {
      id: 5,
      user: "형범이형",
      content: "ㅋㅋㅋㅋ",
      time: "2022-01-12T01:02",
      read: true,
    },
  ];

  const sortedData = sortChatData(chatData);

  // 유저로 필터링해서, 상대방이면 왼쪽에 나면 오른쪽에 뿌린다.
  // 각각을 컴포넌트화 하는게 좋을듯
  // 데이터를 같은 사람 + 1분단위로 묶어서 정리 -> 이걸 뿌려준다.

  return (
    <div className="inner-room-container">
      <InnerRoomNav roomImg={user} username={username} />
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

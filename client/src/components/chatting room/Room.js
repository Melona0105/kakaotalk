import friend from "../../images/nav/friend.png";
import search from "../../images/friend/search.png";
import notiImg from "../../images/chatting/noti.png";
import bucket from "../../images/chatting/bucket.png";
import hamburger from "../../images/chatting/hamburger.png";
import imoticon from "../../images/chatting/imoticon.png";
import upload from "../../images/chatting/upload.png";
import schedule from "../../images/chatting/schedule.png";
import face_talk from "../../images/chatting/face talk.png";
import voice_talk from "../../images/chatting/voice talk.png";
import control_bar from "../../images/chatting/control bar.png";
import "../../css/components/chatting room/Room.css";
import user from "../../images/friend/user1.png";

export default function Room() {
  // TODO : 현재 채팅방의 룸 아이로 채팅 데이터를 가져와야 함
  const roomdata = {
    id: 1,
    img: user, // 채팅방 사진
    username: "윤예린", // 채팅방 이름 ----- 앞에 친구목록에 있는 유저이름
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
      user: "형범이형", // 유저아이디 -> 이거에 해당하는 이름으로 출력해줘야함
      content: "묻지마셈ㅋㅋ",
      time: "2022-01-11 01:02",
    },
    {
      user: "me",
      content: "ㅡㅡ",
      time: "2022-01-11 01:02",
    },
    {
      user: "me",
      content: "오키",
      time: "2022-01-11 01:02",
    },
    {
      user: "me",
      content: "ㅎㅎ",
      time: "2022-01-11 01:02",
    },
    {
      user: "형범이형",
      content: "ㅋㅋㅋㅋ",
      time: "2022-01-11 01:02",
    },
    {
      user: "형범이형",
      content: "잘했네 보니까",
      time: "2022-01-11 01:03",
    },
  ];

  function sortChatData(data) {
    return data.reduce((acc, cur) => {
      const now = acc[acc.length - 1];
      // 이름이 같은지 확인
      if (now?.user === cur.user) {
        // 이름이 같다면, 시간이 같은지 확인한다.
        // 시간이 같다면 그냥 넘어가고,
        // 다르면 데이터에 넣어줘야함
        if (now?.time !== cur.time) {
          acc.push({ user: cur.user, content: [cur.content], time: cur.time });
        } else {
          now.content.push(cur.content);
        }
      } else {
        // 이름이 다르면 시간 넣어버림
        acc.push({ user: cur.user, content: [cur.content], time: cur.time });
      }
      return acc;
    }, []);
  }
  const sortedData = sortChatData(chatData);
  console.log(sortedData);

  // 유저로 필터링해서, 상대방이면 왼쪽에 나면 오른쪽에 뿌린다.
  // 각각을 컴포넌트화 하는게 좋을듯
  // 데이터를 같은 사람 + 1분단위로 묶어서 정리 -> 이걸 뿌려준다.

  return (
    <div className="room-container">
      <div className="room-container-nav">
        <div className="room-container-inner-nav">
          <div className="inner-nav-left">
            <img className="room-nav-user-img" src={img} />
            <div className="room-nav-room-info">
              <div>{username}</div>
              <div className="room-member">
                <img src={friend} />
                <div>2</div>
              </div>
            </div>
          </div>
          <div className="nav-bottom-right">
            <img src={control_bar} />
            <div>
              {[search, notiImg, bucket, hamburger].map((el) => (
                <img src={el} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="room-container-body">이 안에 컨텐츠 뿌리기</div>
      <div className="room-container-input">
        <div className="room-input-nav">
          <div className="room-input-nav-left">
            {[imoticon, upload, schedule].map((el) => (
              <img src={el} />
            ))}
          </div>
          <div className="room-input-nav-right">
            {[voice_talk, face_talk].map((el) => (
              <img src={el} />
            ))}
          </div>
        </div>
        <div className="room-input-area">
          <input />
          <div className="send-button-container">
            <div className="send-button">전송</div>
          </div>
        </div>
      </div>
    </div>
  );
}

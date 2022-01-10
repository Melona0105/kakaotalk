import "../css/pages/ChattingPage.css";
import user from "../images/friend/user1.png";
import ChattingNav from "../components/chatting/ChattingNav";
import Room from "../components/chatting/Room";

export default function ChattingPage() {
  // ? 메시지 데이터에서 읽었는지, 아닌지 여부를 판단
  // ? 그 개수를 넘겨줘서 새 메세지 수를 파악해야 할듯함.
  const roomdata = [
    {
      img: user, // 채팅방 사진
      username: "윤예린", // 채팅방 이름 ----- 앞에 친구목록에 있는 유저이름
      noti: true, // 알람 온오프
      time: "2022-01-10T21:00", // 메세지 시간
      message: "확인 부탁드립니다.", // 메세지 내용
      newMsg: false, // 새 메세지 여부
      newMsgCount: 0, // 새 메세지 개수
    },
    {
      img: user,
      username: "공윤구",
      noti: true,
      time: "2022-01-09T21:32",
      message: "노잼 ㅋㅋ",
      newMsg: true,
      newMsgCount: 1,
    },
    {
      img: user,
      username: "박성민",
      noti: true,
      time: "2022-01-10T11:32",
      message: "생각보다 별로던데?",
      newMsg: true,
      newMsgCount: 3,
    },
    {
      img: user,
      username: "이찬영",
      noti: true,
      time: "2022-01-06T11:32",
      message: "한강 러닝중",
      newMsg: true,
      newMsgCount: 1,
    },
  ].sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });
  console.log(new Date(roomdata[0].time));
  return (
    <div className="chatting-page-container">
      <ChattingNav />
      <div className="chatting-page-content">
        {roomdata.map((el) => (
          <Room key={el.username} data={el} />
        ))}
      </div>
    </div>
  );
}

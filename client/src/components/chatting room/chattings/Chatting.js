import FriendChat from "./FriendChat";
import MyChat from "./MyChat";
import { useSelector } from "react-redux";
import "../../../css/components/chatting room/chattings/Chatting.css";

export default function Chatting({ chattingData, roomImg }) {
  const { id } = useSelector((state) => state.UserInfoReducer);
  // 로그인한 유저와 아이디가 다를 경우, 그 사람의 유저네임을 출력해준다.
  return (
    <div className="chatting-container">
      {chattingData.map((el) =>
        el.user_id === id ? (
          <MyChat
            key={el.content}
            content={el.content}
            time={el.time}
            view={el.view}
          />
        ) : (
          <div className="friend-chat-container">
            <div>
              <img src={roomImg} />
            </div>
            <FriendChat
              key={el.content}
              username={el.username}
              content={el.content}
              time={el.time}
            />
          </div>
        )
      )}
    </div>
  );
}

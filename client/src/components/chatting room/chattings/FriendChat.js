import { printNewMsgTime } from "../../../functions";
import "../../../css/components/chatting room/chattings/FriendChat.css";

export default function FriendChat({ username, content, time }) {
  return (
    <div className="friend-chat-content-container">
      <div>
        <div className="friend-name">{username}</div>
        {content.map((el) => (
          <div
            className="friend-chat-content"
            style={{
              width: `${el.length >= 5 ? el.length * 11 : el.length * 15}px`,
            }}
          >
            {el}
          </div>
        ))}
      </div>
      <div className="friend-chat-time">{printNewMsgTime(time)}</div>
    </div>
  );
}

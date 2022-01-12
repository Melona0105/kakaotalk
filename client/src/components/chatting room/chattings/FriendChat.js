import { printNewMsgTime } from "../../../functions";
import "../../../css/components/chatting room/chattings/FriendChat.css";

export default function FriendChat({ username, content, time }) {
  return (
    <div className="friend-chat-content-container">
      <div>
        <div className="friend-name">{username}</div>
        {content.map((el) => (
          <div className="friend-chat-content">{el}</div>
        ))}
      </div>
      <div className="friend-chat-time">{printNewMsgTime(time)}</div>
    </div>
  );
}

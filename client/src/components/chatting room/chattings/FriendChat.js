import { printNewMsgTime } from "../../../utils";
import "../../../css/components/chatting room/chattings/FriendChat.css";

export default function FriendChat({ username, content, time }) {
  return (
    <div className="friend-chat-content-container">
      <div>
        <div className="friend-name">{username}</div>
        {content.map((el, idx) => {
          return (
            <div className="friend-chat-content-inner-container">
              <div className="friend-chat-content">{el}</div>
              <div className="friend-chat-time">
                {idx === content.length - 1 && printNewMsgTime(time)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

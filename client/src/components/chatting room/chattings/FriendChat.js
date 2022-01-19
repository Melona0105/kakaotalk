import { printNewMsgTime } from "../../../functions";
import "../../../css/components/chatting room/chattings/FriendChat.css";

export default function FriendChat({ username, content, time }) {
  return (
    <div className="friend-chat-content-container">
      <div>
        <div className="friend-name">{username}</div>
        {content.map((el, idx) => {
          let len = el.length;
          if (!(el % 2)) {
            len = el.length + 1;
          }
          return (
            <div className="friend-chat-content-inner-container">
              <div
                className="friend-chat-content"
                style={{
                  width: `${len * 10}px`,
                }}
              >
                {el}
              </div>
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

import "../../../css/components/chatting room/chattings/MyChat.css";
import { printNewMsgTime } from "../../../functions";

export default function MyChat({ content, time, view }) {
  console.log(content);
  return (
    <div className="my-chat-container">
      <div className="my-chat-content-container">
        {content.map((el) => (
          <div
            className="my-chat-content"
            style={{
              width: `${el.length >= 5 ? el.length * 11 : el.length * 15}px`,
            }}
          >
            {el}
          </div>
        ))}
      </div>
      <div className="my-chat-time">
        {view !== 0 && <div className="my-chat-view">1</div>}
        <div> {printNewMsgTime(time)}</div>
      </div>
    </div>
  );
}

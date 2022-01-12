import "../../../css/components/chatting room/chattings/MyChat.css";
import { printNewMsgTime } from "../../../functions";

export default function MyChat({ content, time }) {
  return (
    <div className="my-chat-container">
      <div className="my-chat-content-container">
        {content.map((el) => (
          <div className="my-chat-content">{el}</div>
        ))}
      </div>
      <div className="my-chat-time">{printNewMsgTime(time)}</div>
    </div>
  );
}

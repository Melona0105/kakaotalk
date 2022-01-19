import "../../../css/components/chatting room/chattings/MyChat.css";
import { printNewMsgTime } from "../../../functions";

export default function MyChat({ content, time, view }) {
  return (
    <div className="my-chat-container">
      <div className="my-chat-content-container">
        {content.map((el, idx) => (
          <div className="my-chat-content-inner-container">
            <div
              className="my-chat-content"
              style={{
                width: `${el.length >= 5 ? el.length * 11 : el.length * 15}px`,
              }}
            >
              {el}
            </div>
            <div className="my-chat-time">
              {idx === content.length - 1 && (
                <>
                  {view !== 0 && <div className="my-chat-view">1</div>}
                  <div>{printNewMsgTime(time)}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

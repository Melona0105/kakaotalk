import "../../../css/components/chatting room/chattings/MyChat.css";
import { printNewMsgTime } from "../../../utils";

export default function MyChat({ content, time, view }) {
  return (
    <div className="my-chat-container">
      <div className="my-chat-content-container">
        {content.map((el, idx) => {
          return (
            <div className="my-chat-content-inner-container">
              <div className="my-chat-content">{el}</div>
              <div className="my-chat-time">
                {idx === content.length - 1 && (
                  <>
                    {view !== 0 && <div className="my-chat-view">1</div>}
                    <div>{printNewMsgTime(time)}</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

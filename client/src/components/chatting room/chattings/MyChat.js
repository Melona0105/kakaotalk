import "../../../css/components/chatting room/chattings/MyChat.css";
import { printNewMsgTime } from "../../../functions";

export default function MyChat({ content, time, view }) {
  return (
    <div className="my-chat-container">
      <div className="my-chat-content-container">
        {content.map((el, idx) => {
          let len = el.length;
          if (!(el % 2)) {
            len = el.length + 1;
          }
          return (
            <div className="my-chat-content-inner-container">
              <div
                className="my-chat-content"
                style={{
                  width: `${len * 11}px`,
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
          );
        })}
      </div>
    </div>
  );
}

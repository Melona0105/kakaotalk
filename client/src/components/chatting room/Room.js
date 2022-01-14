import { useState } from "react";
import { printNewMsgTime } from "../../functions";
import Popup from "./Popup";
import "../../css/components/chatting room/Room.css";

export default function Room({ data }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const { id, img, username, noti, time, message, newMsg, newMsgCount } = data;

  const roomStyle = "top=100, left=100, width=375, height=640";

  return (
    <>
      <div
        className="room-container"
        onDoubleClick={() => {
          setIsChattingOn(true);
        }}
      >
        {isChattingOn && (
          <Popup
            style={roomStyle}
            url={`/room/${id}`}
            username={username}
            callback={setIsChattingOn}
          ></Popup>
        )}
        <div className="room-left">
          <img src={img} />
          <div className="room-body">
            <div>{username}</div>
            <div>{message}</div>
          </div>
        </div>
        <div className="room-right">
          <div>{printNewMsgTime(time)}</div>
          {newMsg && <div className="room-newMsg-count">{newMsgCount}</div>}
        </div>
      </div>
    </>
  );
}

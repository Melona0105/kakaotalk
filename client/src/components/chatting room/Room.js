import { useState } from "react";
import user from "../../images/friend/user1.png";
import { printNewMsgTime } from "../../functions";
import Popup from "../etc/Popup";
import "../../css/components/chatting room/Room.css";

export default function Room({ data }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const { room_id, photo, username, time, content, newMsgCount } = data;

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
            url={`/room/${room_id}`}
            username={username}
            callback={setIsChattingOn}
          ></Popup>
        )}
        <div className="room-left">
          <img src={photo ? photo : user} />
          <div className="room-body">
            <div>{username}</div>
            <div>{content}</div>
          </div>
        </div>
        <div className="room-right">
          <div>{printNewMsgTime(time)}</div>
          {newMsgCount && (
            <div className="room-newMsg-count">{newMsgCount}</div>
          )}
        </div>
      </div>
    </>
  );
}

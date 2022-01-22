import { useState } from "react";
import user from "../../images/friend/user1.png";
import { printNewMsgTime } from "../../utils";
import Popup from "../etc/Popup";
import "../../css/components/chatting room/Room.css";
import { useDispatch, useSelector } from "react-redux";
import { handleIsMsgChange } from "../../actions";

export default function Room({ data }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const { id, photo, username, time, content, view } = data;
  const roomStyle = "top=100, left=100, width=375, height=640";
  const { isMsgChange } = useSelector((state) => state.MsgChangeReducer);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="room-container"
        onDoubleClick={() => {
          setIsChattingOn(true);
          setTimeout(() => {
            dispatch(handleIsMsgChange(!isMsgChange));
          }, 1000);
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
          <img src={photo ? photo : user} />
          <div className="room-body">
            <div>{username}</div>
            <div>{content}</div>
          </div>
        </div>
        <div className="room-right">
          <div>{printNewMsgTime(time)}</div>
          {view !== 0 && <div className="room-newMsg-count">{view}</div>}
        </div>
      </div>
    </>
  );
}

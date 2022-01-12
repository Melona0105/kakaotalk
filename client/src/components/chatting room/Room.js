import { useState } from "react";
import { getCurrentDate, getYesterDayDate } from "../../functions";
import Popup from "./Popup";
import "../../css/components/chatting room/Room.css";

export default function Room({ data }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const { id, img, username, noti, time, message, newMsg, newMsgCount } = data;

  const currentDate = getCurrentDate();
  const yesterday = getYesterDayDate();

  function printNewMsgTime(time) {
    const timeArray = time.slice(5).split("T");
    const now = timeArray[0];
    if (now === currentDate) {
      return transTimeToTwelveTime(timeArray[1]);
    } else if (now === yesterday) {
      return "어제";
    } else {
      const msgDate = timeArray[0].split("-");
      let month = msgDate[0];
      month = remoteFrontZero(month);
      let day = msgDate[1];
      day = remoteFrontZero(day);
      return `${month}월 ${day}일`;
    }
  }

  function transTimeToTwelveTime(time) {
    const timeArray = time.split(":");
    if (+timeArray[0] >= 12) {
      return `오후 ${+timeArray[0] - 12}:${timeArray[1]}`;
    }
    return `오전 ${time}`;
  }

  function remoteFrontZero(input) {
    if (input[0] === "0") {
      input = input.slice(1);
    }
    return input;
  }

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
            roomId={id}
            username={username}
            setIsChattingOn={setIsChattingOn}
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

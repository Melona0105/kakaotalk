import react from "react";
import axios from "axios";
import user1 from "../../images/friend/user1.png";
import Popup from "../etc/Popup";
import { useState } from "react";
import "../../css/components/friend/Friend.css";
import Melon from "../../components/etc/Melon";
import FriendMouseMenu from "./FriendMouseMenu";
import { server } from "../../utils";

export default function Friend({ id, src, name, comment, music, option }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const [currentRoomId, setCurrentRommId] = useState(undefined);
  const [isRightButtonOn, setIsRightButtonOn] = useState(false);
  const [settingLocation, setSettingLocation] = useState({ top: 0, left: 0 });
  const friend_id = id;
  const roomStyle = "top=100, left=100, width=375, height=640";

  async function getRoomData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:4000/rooms/${friend_id}`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res)
        .catch((err) => console.log(err));
      setCurrentRommId(data.room_id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="friend-container"
      onDoubleClick={async () => {
        if (!option) {
          await getRoomData();
          setIsChattingOn(true);
        }
      }}
      onContextMenuCapture={(e) => {
        e.preventDefault();
        if (!option && !isRightButtonOn) {
          setIsRightButtonOn(true);
          setSettingLocation({ top: e.pageY, left: e.pageX });
        }
      }}
    >
      <div className="friend-profile">
        <img
          className="friend-profile-photo"
          src={src ? (option ? src : `${server}${src}`) : user1}
        />
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {music && <Melon music={music} />}
      {isRightButtonOn && (
        <FriendMouseMenu
          username={name}
          location={settingLocation}
          setIsRightButtonOn={setIsRightButtonOn}
        />
      )}
      {isChattingOn && (
        <Popup
          style={roomStyle}
          url={`/room/${currentRoomId}`}
          username={name}
          callback={setIsChattingOn}
        ></Popup>
      )}
    </div>
  );
}

import react from "react";
import axios from "axios";
import user1 from "../../images/friend/user1.png";
import Popup from "../etc/Popup";
import { useEffect, useState } from "react";
import "../../css/components/friend/Friend.css";
import Melon from "../../components/etc/Melon";

export default function Friend({ id, src, name, comment, music }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const [currentRoomId, setCurrentRommId] = useState(undefined);
  const friend_id = id;

  const roomStyle = "top=100, left=100, width=375, height=640";

  async function getRoomData() {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:4000/rooms",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { friend_id },
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
        await getRoomData();
        setIsChattingOn(true);
      }}
    >
      <div className="friend-profile">
        {src ? <img src={src} /> : <img src={user1} />}
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {music && <Melon music={music} />}
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

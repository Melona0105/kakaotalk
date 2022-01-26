import react from "react";
import user1 from "../../images/friend/user1.png";
import Popup from "../etc/Popup";
import { useState } from "react";
import "../../css/components/friend/Friend.css";
import Melon from "../../components/etc/Melon";
import RightMouseMenu from "../etc/RightMouseMenu";
import { server } from "../../utils";
import {
  getRoomData,
  hideFriend,
  blockFriend,
  deleteFriend,
} from "../../utils";

export default function Friend({ id, src, name, comment, music, option }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(undefined);
  const [isRightButtonOn, setIsRightButtonOn] = useState(false);
  const [settingLocation, setSettingLocation] = useState({ top: 0, left: 0 });
  const [isProfileOn, setIsProfileOn] = useState(false);
  const friend_id = id;
  const roomStyle = "top=100, left=100, width=375, height=640";

  const rightButtonMenus = [
    { menu: "친구 숨김", event: hideFriend, data: name },
    { menu: "친구 차단", event: blockFriend, data: name },
    { menu: "친구 삭제", event: deleteFriend, data: name },
  ];

  return (
    <div
      className="friend-container"
      onDoubleClick={async () => {
        if (!option) {
          await getRoomData(friend_id, setCurrentRoomId);
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
          src={src ? (option ? src : `${server}/${src}`) : user1}
          onClick={() => !option && setIsProfileOn(true)}
        />
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {music && <Melon music={music} />}
      {isRightButtonOn && (
        <RightMouseMenu
          location={settingLocation}
          setIsRightButtonOn={setIsRightButtonOn}
          rightButtonMenus={rightButtonMenus}
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
      {isProfileOn && (
        <Popup
          style={roomStyle}
          url={`/profile/${friend_id}`}
          username={name}
          callback={setIsProfileOn}
        ></Popup>
      )}
    </div>
  );
}

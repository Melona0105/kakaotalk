import react from "react";
import user1 from "../../../images/friend/user1.png";
import Popup from "../../common/components/Popup";
import "./Friend.css";
import Melon from "../../common/components/Melon";
import RightMouseMenu from "../../common/components/RightMouseMenu";
import { server } from "../../../utils";
import { getRoomData } from "../../../utils";
import useFriend from "./Friend.hook";

function Friend({ id, src, name, comment, music, option }) {
  const { models, operations } = useFriend(id, name);
  const {
    friend_id,
    isRightButtonOn,
    settingLocation,
    rightButtonMenus,
    isChattingOn,
    roomStyle,
    currentRoomId,
    isProfileOn,
  } = models;
  const {
    setCurrentRoomId,
    setIsChattingOn,
    setIsRightButtonOn,
    setSettingLocation,
    setIsProfileOn,
  } = operations;
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
export default Friend;

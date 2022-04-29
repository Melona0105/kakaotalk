import user from "../../../images/friend/user1.png";
import { printNewMsgTime } from "../../../utils";
import Popup from "../../common/components/Popup";
import "./Room.css";
import { server } from "../../../utils";
import RightMouseMenu from "../../common/components/RightMouseMenu";
import useRoom from "./Room.hook";

function Room({ data }) {
  const { id, photo, username, time, content, view } = data;
  const { models, operations } = useRoom(id);
  const {
    isRightButtonOn,
    isChattingOn,
    roomStyle,
    settingLocation,
    rightButtonMenus,
  } = models;
  const {
    setIsChattingOn,
    dispatchHandelIsMsgChange,
    setIsRightButtonOn,
    setSettingLocation,
  } = operations;
  return (
    <>
      <div
        className="room-container"
        onDoubleClick={() => {
          setIsChattingOn(true);
          setTimeout(() => {
            dispatchHandelIsMsgChange();
          }, 1000);
        }}
        onContextMenuCapture={(e) => {
          e.preventDefault();
          if (!isRightButtonOn) {
            setIsRightButtonOn(true);
            setSettingLocation({ top: e.pageY, left: e.pageX });
          }
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
          <img src={photo ? `${server}/${photo}` : user} />
          <div className="room-body">
            <div>{username}</div>
            <div className="room-content">
              <div>{content}</div>
            </div>
          </div>
        </div>
        <div className="room-right">
          <div>{printNewMsgTime(time)}</div>
          {view !== 0 && <div className="room-newMsg-count">{view}</div>}
        </div>
        {isRightButtonOn && (
          <RightMouseMenu
            location={settingLocation}
            setIsRightButtonOn={setIsRightButtonOn}
            rightButtonMenus={rightButtonMenus}
          />
        )}
      </div>
    </>
  );
}
export default Room;

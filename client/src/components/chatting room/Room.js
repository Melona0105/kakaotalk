import { useState } from "react";
import user from "../../images/friend/user1.png";
import { printNewMsgTime } from "../../utils";
import Popup from "../etc/Popup";
import "../../css/components/chatting room/Room.css";
import { useDispatch, useSelector } from "react-redux";
import { handleIsMsgChange } from "../../actions";
import { server } from "../../utils";
import RightMouseMenu from "../etc/RightMouseMenu";

export default function Room({ data }) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const { id, photo, username, time, content, view } = data;
  const roomStyle = "top=100, left=100, width=375, height=640";
  const { isMsgChange } = useSelector((state) => state.MsgChangeReducer);
  const [isRightButtonOn, setIsRightButtonOn] = useState(false);
  const [settingLocation, setSettingLocation] = useState({ top: 0, left: 0 });

  const rightButtonMenus = [
    { menu: "채팅방 열기", callback: () => setIsChattingOn(true) },
    { menu: "채팅방 나가기", callback: () => console.log(2) },
  ];
  const dispatch = useDispatch();

  // TODO : 채팅방 나가기 구현
  // 기본적으로, 채팅방 나가기를 누르면 users_in_rooms에 있는 특정 채팅방의 상태가 1로 바뀌고(기본적으로 0)
  // 상태가 1인 채팅방은 채팅목록에 출력되지 않도록한다.
  // 메세지가 새로 전송되면, 방이 무조건 0이 되도록 바꿔준다. (굳이 한번 확인하고 바꾸는것보단 그냥 바꿔버리는게 쿼리 두번 안하고 좋을듯?)

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

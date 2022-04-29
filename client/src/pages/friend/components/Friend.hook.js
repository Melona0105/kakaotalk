import { useState } from "react";
import { blockFriend, deleteFriend, hideFriend } from "../../../utils";

function useFriend(id, name) {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(undefined);
  const [isRightButtonOn, setIsRightButtonOn] = useState(false);
  const [settingLocation, setSettingLocation] = useState({ top: 0, left: 0 });
  const [isProfileOn, setIsProfileOn] = useState(false);
  const friend_id = id;
  const roomStyle = "top=100, left=100, width=375, height=640";

  const rightButtonMenus = [
    { menu: "친구 숨김", callback: () => hideFriend(name) },
    { menu: "친구 차단", callback: () => blockFriend(name) },
    { menu: "친구 삭제", callback: () => deleteFriend(name) },
  ];

  return {
    models: {
      friend_id,
      isRightButtonOn,
      settingLocation,
      rightButtonMenus,
      isChattingOn,
      roomStyle,
      currentRoomId,
      isProfileOn,
    },
    operations: {
      setCurrentRoomId,
      setIsChattingOn,
      setIsRightButtonOn,
      setSettingLocation,
      setIsProfileOn,
    },
  };
}

export default useFriend;

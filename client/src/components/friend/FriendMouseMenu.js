import { useState } from "react";
import "../../css/components/friend/FriendMouseMenu.css";
import { hideFriend, blockFriend, deleteFriend } from "../../functions";

export default function FriendMouseMenu({
  username,
  location,
  setIsRightButtonOn,
}) {
  const [currentLocation, setCurrentLocation] = useState({ top: 0, left: 0 });

  // TODO : 친구 상태 변경 후 렌더링을 어떻게 시킬지 고민해보자

  return (
    <>
      <div
        className="friend-mouse-menu-container"
        style={{ top: location.top, left: location.left }}
        onClick={() => {
          setIsRightButtonOn(false);
        }}
      >
        <div onClick={() => hideFriend(username)}>친구 숨김</div>
        <div onClick={() => blockFriend(username)}>친구 차단</div>
        <div onClick={() => deleteFriend(username)}>친구 삭제</div>
      </div>
      <div
        className="friend-mouse-menu-back"
        onClick={() => setIsRightButtonOn(false)}
      ></div>
    </>
  );
}

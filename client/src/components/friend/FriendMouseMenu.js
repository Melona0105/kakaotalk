import { useState } from "react";
import "../../css/components/friend/FriendMouseMenu.css";

export default function FriendMouseMenu({ location, setIsRightButtonOn }) {
  const [currentLocation, setCurrentLocation] = useState({ top: 0, left: 0 });

  return (
    <>
      <div
        className="friend-mouse-menu-container"
        style={{ top: location.top, left: location.left }}
      >
        <div>채팅하기</div>
        <div>숨김</div>
        <div>차단</div>
      </div>
      <div
        className="friend-mouse-menu-back"
        onClick={() => setIsRightButtonOn(false)}
      ></div>
    </>
  );
}

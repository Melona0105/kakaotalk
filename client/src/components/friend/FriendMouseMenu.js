import { useState } from "react";
import "../../css/components/friend/FriendMouseMenu.css";
import axios from "axios";

export default function FriendMouseMenu({
  username,
  location,
  setIsRightButtonOn,
}) {
  const [currentLocation, setCurrentLocation] = useState({ top: 0, left: 0 });

  async function deleteFriend() {
    axios({
      method: "DELETE",
      url: "http://localhost:4000/friends",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { username },
    });
  }

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
        <div onClick={() => console.log("채팅")}>채팅하기</div>
        <div onClick={() => console.log("숨김")}>숨김</div>
        <div onClick={() => console.log("차단")}>차단</div>
        <div onClick={() => deleteFriend()}>친구 삭제</div>
      </div>
      <div
        className="friend-mouse-menu-back"
        onClick={() => setIsRightButtonOn(false)}
      ></div>
    </>
  );
}

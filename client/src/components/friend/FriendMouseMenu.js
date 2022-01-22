import { useState, useRef } from "react";
import "../../css/components/friend/FriendMouseMenu.css";
import { hideFriend, blockFriend, deleteFriend } from "../../utils";
import client from "../../Socket";

export default function FriendMouseMenu({
  username,
  location,
  setIsRightButtonOn,
}) {
  function clickEvent(callback, username) {
    callback(username);
    client.emit("friends", "change");
  }

  return (
    <>
      <div
        className="friend-mouse-menu-container"
        style={{ top: location.top, left: location.left }}
        onClick={() => {
          setIsRightButtonOn(false);
        }}
      >
        <div onClick={() => clickEvent(hideFriend, username)}>친구 숨김</div>
        <div onClick={() => clickEvent(blockFriend, username)}>친구 차단</div>
        <div onClick={() => clickEvent(deleteFriend, username)}>친구 삭제</div>
      </div>
      <div
        className="friend-mouse-menu-back"
        onClick={() => setIsRightButtonOn(false)}
      ></div>
    </>
  );
}

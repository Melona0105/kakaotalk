import { useState, useRef } from "react";
import "../../css/components/friend/FriendMouseMenu.css";
import { hideFriend, blockFriend, deleteFriend } from "../../utils";
import { io } from "socket.io-client";

export default function FriendMouseMenu({
  username,
  location,
  setIsRightButtonOn,
}) {
  const socketRef = useRef();
  const client = io("http://localhost:4000");
  socketRef.current = client;

  function clickEvent(callback, username) {
    callback(username);
    socketRef.current.emit("friends", "change");
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

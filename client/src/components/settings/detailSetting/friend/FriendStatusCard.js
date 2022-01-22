import react, { useState, useEffect, useRef } from "react";
import user1 from "../../../../images/friend/user1.png";
import {
  blockFriend,
  deleteFriend,
  rollbackFriend,
} from "../../../../utils";
import { io } from "socket.io-client";

export default function FriendStatusCard({ data, currentStatus }) {
  const { photo, username } = data;
  const socketRef = useRef();
  const client = io("http://localhost:4000");
  socketRef.current = client;

  function clickEvent(callback, username) {
    callback(username);
    socketRef.current.emit("friends", "change");
  }

  return (
    <div className="friend-status-card-container">
      <div>
        <img src={photo ? photo : user1} />
        <div>{username}</div>
      </div>
      <div className="friend-status-card-option">
        {currentStatus === 1 ? (
          <>
            <div onClick={() => clickEvent(rollbackFriend, username)}>
              숨김해제
            </div>
            <div onClick={() => clickEvent(blockFriend, username)}>차단</div>
            <div onClick={() => clickEvent(deleteFriend, username)}>삭제</div>
          </>
        ) : (
          <>
            <div onClick={() => clickEvent(rollbackFriend, username)}>
              차단해제
            </div>
            <div onClick={() => clickEvent(deleteFriend, username)}>삭제</div>
          </>
        )}
      </div>
    </div>
  );
}

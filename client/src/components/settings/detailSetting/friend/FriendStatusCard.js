import user1 from "../../../../images/friend/user1.png";
import { blockFriend, deleteFriend, rollbackFriend } from "../../../../utils";
import client from "../../../../Socket";

export default function FriendStatusCard({ data, currentStatus }) {
  const { photo, username } = data;

  function clickEvent(callback, username) {
    callback(username);
    client.emit("friends", "change");
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

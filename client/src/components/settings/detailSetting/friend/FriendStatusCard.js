import react from "react";
import user1 from "../../../../images/friend/user1.png";
import {
  blockFriend,
  deleteFriend,
  rollbackFriend,
} from "../../../../functions";

export default function FriendStatusCard({ data, currentStatus }) {
  const { photo, username } = data;
  return (
    <div className="friend-status-card-container">
      <div>
        <img src={photo ? photo : user1} />
        <div>{username}</div>
      </div>
      <div className="friend-status-card-option">
        {currentStatus === 1 ? (
          <>
            <div onClick={() => rollbackFriend(username)}>숨김해제</div>
            <div onClick={() => blockFriend(username)}>차단</div>
            <div onClick={() => deleteFriend(username)}>삭제</div>
          </>
        ) : (
          <>
            <div onClick={() => rollbackFriend(username)}>차단해제</div>
            <div onClick={() => deleteFriend(username)}>삭제</div>
          </>
        )}
      </div>
    </div>
  );
}

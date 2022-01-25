import user1 from "../../../../images/friend/user1.png";
import {
  blockFriend,
  deleteFriend,
  rollbackFriend,
  server,
} from "../../../../utils";
import client from "../../../../Socket";

export default function FriendStatusCard({ data, currentStatus }) {
  const { photo, username } = data;

  async function handleClickFriendMenu(callback, username) {
    await callback(username);
    client.emit("friends", "data");
  }

  return (
    <div className="friend-status-card-container">
      <div>
        <img src={photo ? `${server}/${photo}` : user1} />
        <div>{username}</div>
      </div>
      <div className="friend-status-card-option">
        <div onClick={() => handleClickFriendMenu(rollbackFriend, username)}>
          {currentStatus === 1 ? "숨김해제" : "차단해제"}
        </div>
        {currentStatus === 1 && (
          <div onClick={() => handleClickFriendMenu(blockFriend, username)}>
            차단
          </div>
        )}
        <div onClick={() => handleClickFriendMenu(deleteFriend, username)}>
          삭제
        </div>
      </div>
    </div>
  );
}

import "../../css/components/friend/FriendMouseMenu.css";
import client from "../../Socket";
import { hideFriend, blockFriend, deleteFriend } from "../../utils";

export default function FriendMouseMenu({
  username,
  location,
  setIsRightButtonOn,
}) {
  async function handleClickFriendMenu(callback, username) {
    try {
      await callback(username);
      client.emit("friends", "data");
    } catch (err) {
      console.log(err);
    }
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
        <div onClick={() => handleClickFriendMenu(hideFriend, username)}>
          친구 숨김
        </div>
        <div onClick={() => handleClickFriendMenu(blockFriend, username)}>
          친구 차단
        </div>
        <div onClick={() => handleClickFriendMenu(deleteFriend, username)}>
          친구 삭제
        </div>
      </div>
      <div
        className="friend-mouse-menu-back"
        onClick={() => {
          setIsRightButtonOn(false);
        }}
      ></div>
    </>
  );
}

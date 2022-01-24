import "../../css/components/friend/FriendMouseMenu.css";
import { hideFriend, blockFriend, deleteFriend } from "../../utils";

export default function FriendMouseMenu({
  username,
  location,
  setIsRightButtonOn,
}) {
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

import "../../css/components/friend/FriendMouseMenu.css";
import client from "../../Socket";

export default function FriendMouseMenu({
  location,
  setIsRightButtonOn,
  rightButtonMenus,
}) {
  async function onClickMenu(callback, username) {
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
        {rightButtonMenus.map((el) => (
          <div key={el.menu} onClick={() => onClickMenu(el.event, el.data)}>
            {el.menu}
          </div>
        ))}
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

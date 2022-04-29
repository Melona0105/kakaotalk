import "./RightMouseMenu.css";
import client from "../../../Socket";

export default function FriendMouseMenu({
  location,
  setIsRightButtonOn,
  rightButtonMenus,
}) {
  async function onClickMenu(callback) {
    try {
      await callback();
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
          <div key={el.menu} onClick={() => onClickMenu(el.callback)}>
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

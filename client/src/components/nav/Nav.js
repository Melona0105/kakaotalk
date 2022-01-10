import "../../css/components/Nav.css";
import friend from "../../images/nav/friend.png";
import chat from "../../images/nav/chat.png";
import seemore from "../../images/nav/seemore.png";
import noti from "../../images/nav/noti.png";
import setting from "../../images/nav/setting.png";
import NavMenu from "./NavMenu";

export default function Nav({ currentPage, setIsCurrentPage }) {
  const menus = [friend, chat, seemore];
  return (
    <div className="nav-container">
      <div className="nav-continer-innerbox pages">
        {menus.map((el, index) => (
          <NavMenu
            currentPage={currentPage}
            index={index}
            src={el}
            setIsCurrentPage={setIsCurrentPage}
          />
        ))}
      </div>
      <div className="nav-continer-innerbox options">
        <img src={noti} />
        <img src={setting} />
      </div>
    </div>
  );
}

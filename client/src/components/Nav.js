import "../css/components/Nav.css";
import friend from "../images/nav/friend.png";
import chat from "../images/nav/chat.png";
import seemore from "../images/nav/seemore.png";
import noti from "../images/nav/noti.png";
import setting from "../images/nav/setting.png";

export default function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-continer-innerbox pages">
        <img src={friend} />
        <img src={chat} />
        <img src={seemore} />
      </div>
      <div className="nav-continer-innerbox options">
        <img src={noti} />
        <img src={setting} />
      </div>
    </div>
  );
}

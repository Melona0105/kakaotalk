import "../../css/components/Nav.css";
import friend from "../../images/nav/friend.png";
import chat from "../../images/nav/chat.png";
import seemore from "../../images/nav/seemore.png";
import noti from "../../images/nav/noti.png";
import setting from "../../images/nav/setting.png";
import NavMenu from "./NavMenu";
import { useState } from "react";
import Setting from "../settings/Setting";
export default function Nav({ currentPage, totalNewMsg }) {
  const menus = [friend, chat, seemore];
  const [isSettingOn, setIsSettingOn] = useState(false);
  const [settingLocation, setSettingLocation] = useState({ top: 0, left: 0 });

  return (
    <div className="nav-container">
      <div className="nav-continer-innerbox pages">
        {menus.map((el, index) => (
          <NavMenu
            key={el}
            currentPage={currentPage}
            index={index}
            src={el}
            totalNewMsg={totalNewMsg}
          />
        ))}
      </div>
      <div className="nav-continer-innerbox options">
        <img src={noti} />
        <img
          src={setting}
          onClick={(e) => {
            setSettingLocation({ top: e.pageY, left: e.pageX });
            setIsSettingOn(true);
          }}
        />
        {isSettingOn && (
          <Setting location={settingLocation} setIsSettingOn={setIsSettingOn} />
        )}
      </div>
    </div>
  );
}

import "../../css/components/settings/DetailSetting.css";
import SettingNav from "./SettingNav";
import { useState } from "react";
import ProfileSetting from "./ProfileSetting";
import FriendSetting from "./FriendSetting";

export default function DetailSetting() {
  const [currentSetting, setCurrentSetting] = useState(0);
  const menus = ["프로필", "친구"];

  return (
    <div className="detail-setting-container">
      <nav>설정</nav>
      <div className="detail-setting-inner-container">
        <div className="detail-nav">
          {menus.map((el, index) => (
            <SettingNav
              key={el}
              currentSetting={currentSetting}
              menu={el}
              index={index}
              setCurrentSetting={setCurrentSetting}
            />
          ))}
        </div>
        <div className="detail-body">
          {currentSetting === 0 && <ProfileSetting />}
          {currentSetting === 1 && <FriendSetting />}
        </div>
      </div>
    </div>
  );
}

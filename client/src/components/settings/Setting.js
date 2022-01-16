import "../../css/components/settings/Setting.css";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLogin, handleUserInfo } from "../../actions";
import { useState } from "react";
import Popup from "../chatting room/Popup";

export default function Setting({ location, setIsSettingOn }) {
  const [isDetailOn, setIsDetailOn] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({ top: 0, left: 0 });
  function logoutHandler() {
    dispatch(handleUserInfo(undefined));
    localStorage.removeItem("token");
    dispatch(handleIsLogin(false));
  }

  const roomStyle = `top=${currentLocation.top - 450}, left=${
    currentLocation.left + 300
  }, width=600, height=450`;

  function settingPopupCallback(input) {
    setIsDetailOn(input);
    setIsSettingOn(input);
  }

  return (
    <>
      <div
        className="setting-container"
        style={{ top: location.top - 50, left: location.left }}
      >
        <div
          onClick={(e) => {
            setIsDetailOn(true);
            setCurrentLocation({ top: e.pageY, left: e.pageX });
          }}
        >
          환경설정
        </div>
        {isDetailOn && (
          <Popup
            style={roomStyle}
            url={`/setting`}
            username="detail-setting"
            callback={settingPopupCallback}
          />
        )}
        <div
          onClick={() => {
            logoutHandler();
          }}
        >
          로그아웃
        </div>
      </div>
      <div className="setting-back" onClick={() => setIsSettingOn(false)}></div>
    </>
  );
}

import "./Setting.css";
import Popup from "../Popup";
import useSetting from "./Setting.hook";

function Setting({ location, setIsSettingOn }) {
  const { models, operations } = useSetting();
  const { isDetailOn, roomStyle } = models;
  const {
    setIsDetailOn,
    setCurrentLocation,
    settingPopupCallback,
    logoutHandler,
  } = operations;
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

export default Setting;

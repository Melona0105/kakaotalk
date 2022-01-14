import "../../css/components/settings/Setting.css";
import { useDispatch } from "react-redux";
import { handleIsLogin } from "../../actions";

export default function Setting({ location, setIsSettingOn }) {
  const dispatch = useDispatch();
  function logoutHandler() {
    localStorage.removeItem("token");
    dispatch(handleIsLogin(false));
  }
  return (
    <>
      <div
        className="setting-container"
        style={{ top: location.top - 50, left: location.left }}
      >
        <div>환경설정</div>
        <div onClick={() => logoutHandler()}>로그아웃</div>
      </div>
      <div className="setting-back" onClick={() => setIsSettingOn(false)}></div>
    </>
  );
}

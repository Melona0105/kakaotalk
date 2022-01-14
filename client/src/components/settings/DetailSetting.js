import { useSelector } from "react-redux";
import user1 from "../../images/friend/user1.png";
import "../../css/components/settings/DetailSetting.css";

export default function DetailSetting() {
  const userInfo = useSelector((state) => state.UserInfoReducer);
  console.log(userInfo);
  return (
    <div className="detail-setting-container">
      <nav>설정</nav>
      <div className="detail-setting-inner-container">
        <div className="detail-nav">
          <div>프로필</div>
        </div>
        <div className="detail-main">
          <div>기본 프로필 관리</div>
          {userInfo.photo ? <img src={userInfo.photo} /> : <img src={user1} />}
          <div>{userInfo.username}</div>
        </div>
      </div>
    </div>
  );
}

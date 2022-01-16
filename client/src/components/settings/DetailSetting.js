import user1 from "../../images/friend/user1.png";
import "../../css/components/settings/DetailSetting.css";
import { useSelector } from "react-redux";

export default function DetailSetting() {
  const { photo, username, email } = useSelector(
    (state) => state.UserInfoReducer
  );

  return (
    <div className="detail-setting-container">
      <nav>설정</nav>
      <div className="detail-setting-inner-container">
        <div className="detail-nav">
          <div>프로필</div>
        </div>
        <div className="detail-body">
          <div className="detail-body-top">
            <div>기본 프로필 관리</div>
            <div className="edit-detail-profile">
              <div>
                {photo ? <img src={photo} /> : <img src={user1} />}
                <div>{username}</div>
              </div>
              <div className="edit-button">편집</div>
            </div>
          </div>
          <div className="detail-body-bottom">
            <div className="detail-email">
              <div>계정</div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

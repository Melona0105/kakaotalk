import user1 from "../../images/friend/user1.png";
import { useSelector } from "react-redux";
import "../../css/components/settings/ProfileSetting.css";

export default function Profile() {
  const { photo, username, email } = useSelector(
    (state) => state.UserInfoReducer
  );
  return (
    <div className="profile-setting-container">
      <div>
        <div>기본 프로필 관리</div>
        <div className="pofile-setting-edit">
          <div>
            {photo ? <img src={photo} /> : <img src={user1} />}
            <div>{username}</div>
          </div>
          <div className="pofile-setting-edit-button">편집</div>
        </div>
      </div>
      <div>
        <div className="pofile-setting-email">
          <div>계정</div>
          <div>{email}</div>
        </div>
      </div>
    </div>
  );
}

import user1 from "../../../../../images/friend/user1.png";
import "./ProfileSetting.css";
import LoadingPage from "../../../../../utils/loading/LoadingPage";
import EditProfile from "./EditProfile";
import { server } from "../../../../../utils";
import useProfileSetting from "./ProfileSetting.hook";

function ProfileSetting() {
  const { models, operations } = useProfileSetting();
  const { isLoadingOn, userInfo, isEditOn, editValue } = models;
  const { setIsEditOn, setEditValue } = operations;
  return (
    <>
      {isLoadingOn && <LoadingPage />}
      <div className="profile-setting-container">
        <div>
          <div>기본 프로필 관리</div>
          <div className="pofile-setting-edit">
            <div>
              <img
                src={userInfo.photo ? `${server}/${userInfo.photo}` : user1}
              />
              <div>{userInfo.username}</div>
            </div>
            <div
              className="pofile-setting-edit-button"
              onClick={() => setIsEditOn(true)}
            >
              편집
            </div>
          </div>
          {isEditOn && (
            <EditProfile
              setIsEditOn={setIsEditOn}
              userInfo={userInfo}
              editValue={editValue}
              setEditValue={setEditValue}
            />
          )}
        </div>
        <div>
          <div className="pofile-setting-email">
            <div>계정</div>
            <div>{userInfo.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSetting;

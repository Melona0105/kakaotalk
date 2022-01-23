import user1 from "../../../images/friend/user1.png";
import "../../../css/components/settings/detailSetting/ProfileSetting.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn } from "../../../actions";
import client from "../../../Socket";
import Service from "../../../services";
import LoadingPage from "../../../components/LoadingPage";
import EditProfile from "./EditProfile";
import { server } from "../../../utils";

export default function Profile() {
  const dispatch = useDispatch();
  const [isEditOn, setIsEditOn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const { photo, username, email } = userInfo;
  const [editValue, setEditValue] = useState("");
  const [isRendering, setIsRendering] = useState("");
  const { isLoadingOn } = useSelector((state) => state.LoadingReducer);

  client.on("friends", () => {
    setIsRendering(!isRendering);
  });

  useEffect(async () => {
    dispatch(handleLoadingOn(true));
    try {
      const data = await Service.users.fetchUserInfo();
      setUserInfo(data);
    } catch (err) {
      throw err;
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }, [isRendering]);

  return (
    <>
      {isLoadingOn && <LoadingPage />}
      <div className="profile-setting-container">
        <div>
          <div>기본 프로필 관리</div>
          <div className="pofile-setting-edit">
            <div>
              <img src={photo ? `${server}${photo}` : user1} />
              <div>{username}</div>
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
            <div>{email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

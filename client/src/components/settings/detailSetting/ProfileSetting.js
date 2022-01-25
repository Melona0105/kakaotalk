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
  const [editValue, setEditValue] = useState("");
  const { isLoadingOn } = useSelector((state) => state.LoadingReducer);

  useEffect(() => {
    client.on("friends", () => {
      getUserInfo();
    });
  }, []);

  // useEffect(() => {
  //   return () => {
  //     client.close();
  //   };
  // }, []);

  async function getUserInfo() {
    dispatch(handleLoadingOn(true));
    try {
      const data = await Service.users.fetchUserInfo();
      setUserInfo(data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

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

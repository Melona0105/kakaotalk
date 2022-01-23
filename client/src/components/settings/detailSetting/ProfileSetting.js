import user1 from "../../../images/friend/user1.png";
import "../../../css/components/settings/detailSetting/ProfileSetting.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn } from "../../../actions";
import client from "../../../Socket";
import Service from "../../../services";
import LoadingPage from "../../../components/LoadingPage";

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

  function sendEditData() {
    // 사진바꾼것과, 이름 바꾼것 전송
    client.emit("friends", "data");
    console.log("변경 내용 전송");
    editUsername();
  }

  async function editUsername() {
    // 데이터 바꿨으니, 바꾼다음 유저인포 다시 로딩해주기
    dispatch(handleLoadingOn(true));
    try {
      if (editValue !== "") {
        await axios({
          method: "PUT",
          url: "http://localhost:4000/edit/username",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          data: { username: editValue },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  function editImage() {
    alert("이미지!");
  }

  // 에딧상태가 바뀌면서 굳이 얘를 뭐가 바뀌는지 감지 안해줘도 다시 렌더링 해오네?
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
              <img
                src={photo ? photo : user1}
                onClick={() => isEditOn && editImage()}
              />
              {isEditOn ? (
                <input
                  placeholder={username}
                  className="edit-username"
                  onChange={(e) => {
                    setEditValue(e.target.value);
                  }}
                ></input>
              ) : (
                <div>{username}</div>
              )}
            </div>
            <div
              className="pofile-setting-edit-button"
              onClick={() => {
                setIsEditOn(!isEditOn);
                if (isEditOn) {
                  sendEditData();
                }
              }}
            >
              {!isEditOn ? "편집" : "확인"}
            </div>
          </div>
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

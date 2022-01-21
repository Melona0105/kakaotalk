import user1 from "../../../images/friend/user1.png";
import { useSelector } from "react-redux";
import "../../../css/components/settings/detailSetting/ProfileSetting.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleLoadingOn } from "../../../actions";

export default function Profile() {
  const dispatch = useDispatch();
  const [isEditOn, setIsEditOn] = useState(false);
  const { photo, username, email } = useSelector(
    (state) => state.UserInfoReducer
  );
  const [editValue, setEditValue] = useState(username);

  function sendEditData() {
    // 사진바꾼것과, 이름 바꾼것 전송
    console.log("변경 내용 전송");
    editUsername();
  }

  function editImage() {
    console.log("사진 변경");
  }

  async function editUsername() {
    // 데이터 바꿨으니, 바꾼다음 유저인포 다시 로딩해주기 --> 근데 리덕스안되는데 씁..
    dispatch(handleLoadingOn(true));
    try {
      await axios({
        method: "PUT",
        url: "http://localhost:4000/edit/username",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { username: editValue },
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  return (
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
  );
}

import user1 from "../../../images/friend/user1.png";
import "../../../css/components/settings/detailSetting/EditProfile.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLoadingOn } from "../../../actions";
import { server } from "../../../utils";
import Service from "../../../services";
import client from "../../../Socket";

export default function EditProfile({
  setIsEditOn,
  setEditValue,
  userInfo,
  editValue,
}) {
  const dispatch = useDispatch();
  const { photo, username, id } = userInfo;
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [isTextChanged, setIsTextChanged] = useState(false);
  const [isPhotoEditOn, setIsPhotoEditOn] = useState(false);
  function getUserPhoto() {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setCurrentPhoto(reader.result);
    });
  }

  async function sendEditData() {
    // 사진바꾼것과, 이름 바꾼것 전송
    await editUsername();
    await editPhoto();
    client.emit("friends", "data");
  }

  async function editUsername() {
    // 데이터 바꿨으니, 바꾼다음 유저인포 다시 로딩해주기
    dispatch(handleLoadingOn(true));
    try {
      if (editValue !== "") {
        await Service.users.updateUsername(editValue);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  // 서버로 이미지를 전송하는 함수
  async function editPhoto() {
    try {
      if (currentPhoto !== null) {
        const blobBin = atob(currentPhoto.split(",")[1]);
        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(array)], {
          type: `image/png`,
        });
        const file = new File([blob], `User-${id}-${Date.now()}.png`);
        const formData = new FormData();
        formData.append(`img`, file);
        await Service.users.updateUserPhoto(formData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  useEffect(() => {
    editValue !== "" ? setIsTextChanged(true) : setIsTextChanged(false);
  }, [editValue]);
  return (
    <>
      <div className="profile-editor-container">
        <div>
          <div>기본 프로필 편집</div>
        </div>
        <div className="photo-edit-container">
          <label htmlFor="edit-user-photo">
            <img
              src={
                currentPhoto
                  ? isPhotoEditOn
                    ? currentPhoto
                    : `${server}/${currentPhoto}`
                  : user1
              }
            />
          </label>
          <div className="form-group">
            <input
              id="edit-user-photo"
              type="file"
              className="photo-edit-file-upload"
              onChange={() => {
                setIsPhotoEditOn(true);
                getUserPhoto();
              }}
            />
          </div>
        </div>
        <div>
          <input
            placeholder={username}
            className="edit-username"
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
          ></input>
        </div>

        <div>
          {currentPhoto !== photo || isTextChanged ? (
            <div
              onClick={() => {
                setIsEditOn(false);
                sendEditData();
              }}
              className="edit-confirm-button-on"
            >
              확인
            </div>
          ) : (
            <div className="edit-confirm-button-off">확인</div>
          )}
        </div>
      </div>
      <div className="=profile-editor-back"></div>
    </>
  );
}

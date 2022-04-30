import user1 from "../../../../../images/friend/user1.png";
import "./EditProfile.css";
import { server } from "../../../../../utils";
import useEditProfile from "./EditProfile.hook";

function EditProfile({ setIsEditOn, setEditValue, userInfo, editValue }) {
  const { models, operations } = useEditProfile(userInfo, editValue);
  const { currentPhoto, isPhotoEditOn, username, photo, isTextChanged } =
    models;
  const { setIsPhotoEditOn, getUserPhoto, sendEditData } = operations;
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

export default EditProfile;

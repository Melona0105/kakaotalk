import user1 from "../../../images/friend/user1.png";
import "../../../css/components/settings/detailSetting/EditProfile.css";
import { useEffect, useState } from "react";

export default function EditProfile({
  setIsEditOn,
  setEditValue,
  userInfo,
  sendEditData,
  editValue,
}) {
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [isTextChanged, setIsTextChanged] = useState(false);
  const { photo, username } = userInfo;

  useEffect(() => {
    editValue !== "" ? setIsTextChanged(true) : setIsTextChanged(false);
  }, [editValue]);
  return (
    <>
      <div className="profile-editor">
        <div>
          <div>기본 프로필 편집</div>
        </div>
        <div>
          <img src={photo ? photo : user1} />
          <form
            action="/upload_images"
            method="post"
            enctype="multipart/form-data"
          >
            <div class="form-group">
              <input
                type="file"
                class="form-control-file"
                id="fileupload"
                name="fileupload"
              />
            </div>
          </form>
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
          <input
            type="submit"
            onClick={() => {
              setIsEditOn(false);
              sendEditData();
            }}
            className={
              isTextChanged
                ? "edit-confirm-button-on"
                : "edit-confirm-button-off"
            }
            value="확인"
          />
        </div>
      </div>
      <div className="=profile-editor-back"></div>
    </>
  );
}

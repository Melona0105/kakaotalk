import "../../../css/components/settings/detailSetting/UploadImage.css";

export default function UploadImage({ username, setEditValue }) {
  return (
    <div className="image-uploader">
      <form action="/upload_images" method="post" enctype="multipart/form-data">
        <div class="form-group">
          <input
            type="file"
            class="form-control-file"
            id="fileupload"
            name="fileupload"
          />
        </div>
        <input type="submit" value="올리기" />
      </form>
      <input
        placeholder={username}
        className="edit-username"
        onChange={(e) => {
          setEditValue(e.target.value);
        }}
      ></input>
    </div>
  );
}

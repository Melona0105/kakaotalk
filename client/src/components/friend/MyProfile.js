import myphoto from "../../images/friend/my photo.png";
import "../../css/components/friend/MyProfile.css";
import Melon from "../etc/Melon";

export default function MyProfile({ data }) {
  const { photo, username, song, comment } = data;
  return (
    <div className="my-profile">
      <div className="my-profile-img-container">
        <img src={photo} />
      </div>
      <div className="my-profile-detail">
        <div>
          <div className="my-profile-username">{username}</div>
          <div className="my-profile-comment">{comment}</div>
        </div>
        <Melon song={song} />
      </div>
    </div>
  );
}

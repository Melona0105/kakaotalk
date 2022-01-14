import myphoto from "../../images/friend/my photo.png";
import "../../css/components/friend/MyProfile.css";
import Melon from "../etc/Melon";
import user1 from "../../images/friend/user1.png";

export default function MyProfile({ data }) {
  const { photo, username, song, comment } = data;
  return (
    <div className="my-profile">
      <div className="my-profile-img-container">
        {photo ? <img src={photo} /> : <img src={user1} />}
      </div>
      <div className="my-profile-detail">
        <div>
          <div className="my-profile-username">{username}</div>
          {comment && <div className="my-profile-comment">{comment}</div>}
        </div>
        {song && <Melon song={song} />}
      </div>
    </div>
  );
}

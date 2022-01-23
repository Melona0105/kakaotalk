import "../../css/components/friend/MyProfile.css";
import Melon from "../etc/Melon";
import user1 from "../../images/friend/user1.png";
import { useSelector } from "react-redux";
import { server } from "../../utils";

export default function MyProfile() {
  const { photo, username, comment, music } = useSelector(
    (state) => state.UserInfoReducer
  );

  return (
    <div className="my-profile">
      <div className="my-profile-img-container">
        <img src={photo ? `${server}${photo}` : user1} />
      </div>
      <div className="my-profile-detail">
        <div>
          <div className="my-profile-username">{username}</div>
          {comment && <div className="my-profile-comment">{comment}</div>}
        </div>
        {music && <Melon music={music} />}
      </div>
    </div>
  );
}

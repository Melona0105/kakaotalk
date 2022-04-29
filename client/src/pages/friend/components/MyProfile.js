import { useState } from "react";
import "./MyProfile.css";
import Melon from "../../common/components/Melon";
import user1 from "../../../images/friend/user1.png";
import { useSelector } from "react-redux";
import { server } from "../../../utils";
import Popup from "../../common/components/Popup";

export default function MyProfile() {
  const [isProfileOn, setIsProfileOn] = useState(false);
  const { id, photo, username, comment, music } = useSelector(
    (state) => state.UserInfoReducer
  );
  const roomStyle = "top=100, left=100, width=375, height=640";
  return (
    <div className="my-profile">
      <div className="my-profile-img-container">
        <img
          src={photo ? `${server}/${photo}` : user1}
          onClick={() => setIsProfileOn(true)}
        />
      </div>
      <div className="my-profile-detail">
        <div>
          <div className="my-profile-username">{username}</div>
          {comment && <div className="my-profile-comment">{comment}</div>}
        </div>
        {music && <Melon music={music} />}
      </div>
      {isProfileOn && (
        <Popup
          style={roomStyle}
          url={`/profile/${id}`}
          username={username}
          callback={setIsProfileOn}
        ></Popup>
      )}
    </div>
  );
}

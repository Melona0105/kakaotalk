import myphoto from "../../images/friend/my photo.png";
import '../../css/components/friend/MyProfile.css'

export default function MyProfile() {
  return (
    <div className="my-profile">
      <div className="my-profile-img-container">
        <img src={myphoto} />
      </div>
      <div className="my-profile-detail">
        <div className="my-profile-username">박덕원</div>
        <div className="my-profile-song">행복해서 미안해 - 다비치</div>
      </div>
    </div>
  );
}

import "./Melon.css";
import play from "../../../images/friend/play.png";

export default function Melon({ music }) {
  return (
    <div className="profile-music">
      <div>{music}</div>
      <img src={play} />
    </div>
  );
}

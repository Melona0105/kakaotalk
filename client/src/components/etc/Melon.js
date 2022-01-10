import "../../css/components/etc/Melon.css";
import play from "../../images/friend/play.png";

export default function Melon({ song }) {
  return (
    <div className="profile-song">
      <div>{song}</div>
      <img src={play} />
    </div>
  );
}

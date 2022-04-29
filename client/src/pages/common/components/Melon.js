import "./Melon.css";
import play from "../../../images/friend/play.png";

function Melon({ music }) {
  return (
    <div className="profile-music">
      <div>{music}</div>
      <img src={play} />
    </div>
  );
}
export default Melon;

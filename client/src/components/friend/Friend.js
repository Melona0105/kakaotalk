import user1 from "../../images/friend/user1.png";
import "../../css/components/friend/Friend.css";
import Melon from "../../components/etc/Melon";

export default function Friend({ src, name, comment, music }) {
  return (
    <div className="friend-container">
      <div className="friend-profile">
        {src ? <img src={src} /> : <img src={user1} />}
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {music && <Melon music={music} />}
    </div>
  );
}

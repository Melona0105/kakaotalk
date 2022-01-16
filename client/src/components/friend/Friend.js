import "../../css/components/friend/Friend.css";
import Melon from "../../components/etc/Melon";

export default function Friend({ src, name, comment, music }) {
  return (
    <div className="friend-container">
      <div className="friend-profile">
        <img src={src} />
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {music && <Melon music={music} />}
    </div>
  );
}

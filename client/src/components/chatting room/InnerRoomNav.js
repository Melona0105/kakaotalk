import search from "../../images/friend/search.png";
import notiImg from "../../images/chatting/noti.png";
import bucket from "../../images/chatting/bucket.png";
import hamburger from "../../images/chatting/hamburger.png";
import control_bar from "../../images/chatting/control bar.png";
import friend from "../../images/nav/friend.png";
import "../../css/components/chatting room/InnerRoomNav.css";
import { server } from "../../utils";

export default function InnerRoomNav({ roomImg, roomData }) {
  const { photo, username } = roomData;
  return (
    <div className="inner-room-container-nav">
      <div className="inner-room-container-inner-nav">
        <div className="inner-nav-left">
          <img
            className="inner-room-nav-user-img"
            src={photo ? `${server}${photo}` : roomImg}
          />
          <div className="inner-room-nav-room-info">
            <div>{username}</div>
            <div className="inner-room-member">
              <img src={friend} />
              <div>2</div>
            </div>
          </div>
        </div>
        <div className="nav-bottom-right">
          <img src={control_bar} />
          <div>
            {[search, notiImg, bucket, hamburger].map((el) => (
              <img src={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

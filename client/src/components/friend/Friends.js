import { useState } from "react";
import "../../css/components/friend/Friends.css";
import open from "../../images/friend/open.png";
import close from "../../images/friend/close.png";
import Friend from "./Friend";

export default function Friends({ data }) {
  const [isDetailOn, setIsDetailOn] = useState(true);
  return (
    <div className="my-friends-container">
      <div>
        <div className="my-friends-title">
          <div>
            <div>친구</div>
            <div>{data.length}</div>
          </div>
          <img
            className="my-friends-button"
            src={isDetailOn ? close : open}
            onClick={() => setIsDetailOn(!isDetailOn)}
          />
        </div>
        <div>
          {isDetailOn &&
            data.map((el) => (
              <Friend
                key={el.username}
                src={el.photo}
                name={el.username}
                song={el.song}
                comment={el.comment}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

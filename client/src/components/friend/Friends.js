import { useState } from "react";
import "../../css/components/friend/Friends.css";
import open from "../../images/friend/open.png";
import close from "../../images/friend/close.png";
import Friend from "./Friend";



// TODO : 나중에 useEffect로 제일 위에서 변환해줘야할듯?

export default function Friends({ data }) {
  const [isDetailOn, setIsDetailOn] = useState(true);
  return (
    <div className="my-friends-container">
      <div>
        <div className="my-friends-title">
          <div>친구</div>
          <div>{data.length}</div>
        </div>
        <div>
          {isDetailOn &&
            data.map((el) => (
              <Friend
                key={el.username}
                src={el.photo}
                name={el.username}
                song={el.song}
              />
            ))}
        </div>
      </div>
      <img
        src={isDetailOn ? close : open}
        onClick={() => setIsDetailOn(!isDetailOn)}
      />
    </div>
  );
}

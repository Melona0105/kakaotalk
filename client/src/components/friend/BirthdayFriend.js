import { useState } from "react";
import birthday from "../../images/friend/birthday.png";
import open from "../../images/friend/open.png";
import close from "../../images/friend/close.png";
import "../../css/components/friend/BirthdayFriend.css";

export default function BirthdayFriend({ birthData }) {
  const [isDetailOn, setIsDetailOn] = useState(true);
  return (
    <div className="birthday-friend-container">
      <div>
        <div className="birthday-friend-title">생일인 친구</div>
        <img
          src={isDetailOn ? close : open}
          onClick={() => setIsDetailOn(!isDetailOn)}
        />
      </div>
      {isDetailOn && (
        <div className="birthday-friend-content">
          <img src={birthday} />
          <div className="birthday-friend-content-detail">
            <div> 친구의 생일을 확인해보세요! </div>
            <div className="birthday-friend-count"> {birthData.length} </div>
          </div>
        </div>
      )}
    </div>
  );
}

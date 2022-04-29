import { useState } from "react";
import open from "../../../images/friend/open.png";
import close from "../../../images/friend/close.png";
import "./BirthdayFriend.css";
import Friend from "./Friend";

export default function BirthdayFriend({ birthData }) {
  const [isDetailOn, setIsDetailOn] = useState(true);
  return (
    <div className="birthday-friend-container">
      <div>
        <div className="birthday-friend-title">{`오늘 생일인 친구 ${birthData.length}`}</div>
        <img
          src={isDetailOn ? close : open}
          onClick={() => setIsDetailOn(!isDetailOn)}
        />
      </div>
      {isDetailOn && (
        <div className="birthday-friend-content">
          {birthData.map((el) => (
            <Friend
              key={el.username}
              id={el.id}
              src={el.photo}
              name={el.username}
              music={el.music}
              comment={el.comment}
              option={el.option}
            />
          ))}
        </div>
      )}
    </div>
  );
}

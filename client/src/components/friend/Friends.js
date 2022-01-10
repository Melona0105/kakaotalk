import { useEffect, useState } from "react";
import "../../css/components/friend/Friends.css";
import kakaoUser from "../../images/friend/kakaoUser.png";
import open from "../../images/friend/open.png";
import close from "../../images/friend/close.png";
import Friend from "./Friend";
const fakeDate = [
  {
    photo: kakaoUser,
    username: "이신이",
    birth: "1992-07-14",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "김예슬",
    birth: "1994-03-16",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "구다영",
    birth: "1992-05-25",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "설설아",
    birth: "1992-03-30",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "김다영",
    birth: "1992-06-08",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "김소라",
    birth: "1995-10-18",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "이은지",
    birth: "1994-11-10",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "이경윤",
    birth: "1993-08-16",
    song: null,
  },
  {
    photo: kakaoUser,
    username: "정가은",
    birth: "1993-11-01",
    song: "시간을 거슬러 - SG워너비",
  },
];

function sortDataToAlphabeticalOrder(data) {
  data.sort((a, b) => {
    if (a.username < b.username) {
      return -1;
    }
  });
}

// TODO : 나중에 useEffect로 제일 위에서 변환해줘야할듯?
sortDataToAlphabeticalOrder(fakeDate);

export default function Friends() {
  const [isDetailOn, setIsDetailOn] = useState(true);
  return (
    <div className="my-friends-container">
      <div>
        <div className="my-friends-title">
          <div>친구</div>
          <div>{fakeDate.length}</div>
        </div>
        <div>
          {isDetailOn &&
            fakeDate.map((el) => (
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

import React, { useEffect, useState } from "react";
import "../css/pages/FriendPage.css";
import FriendNav from "../components/friend/FriendNav";
import MyProfile from "../components/friend/MyProfile";
import BirthdayFriend from "../components/friend/BirthdayFriend";
import Friends from "../components/friend/Friends";
import user1 from "../images/friend/user1.png";
import myphoto from "../images/friend/my photo.png";

export default function FriendPage() {
  const [isBirthdayOn, setIsBirthdayOn] = useState(false);

  const userInfo = {
    photo: myphoto,
    username: "박덕원",
    birth: "1993-01-05",
    song: "행복해서 미안해 - 다비치",
    comment: "My Kakao Talk",
  };
  const fakeData = [
    {
      photo: user1,
      username: "현광진",
      birth: "1992-01-10",
      song: null,
      comment: "INNTW",
    },
    {
      photo: user1,
      username: "최우석",
      birth: "1994-03-16",
      song: null,
      comment: "배고프네..",
    },
    {
      photo: user1,
      username: "이형범",
      birth: "1992-05-25",
      song: null,
      comment: "감사합니다.",
    },
    {
      photo: user1,
      username: "김아현",
      birth: "1992-03-30",
      song: null,
      comment: "",
    },
    {
      photo: user1,
      username: "윤예린",
      birth: "1992-06-08",
      song: null,
      comment: "",
    },
    {
      photo: user1,
      username: "박성민",
      birth: "1992-10-18",
      song: null,
      comment: "",
    },
    {
      photo: user1,
      username: "송자혜",
      birth: "1994-11-10",
      song: null,
      comment: "",
    },
    {
      photo: user1,
      username: "공윤구",
      birth: "1993-08-16",
      song: null,
      comment: "",
    },
    {
      photo: user1,
      username: "이찬영",
      birth: "1993-11-01",
      song: "시간을 거슬러 - SG워너비",
      comment: "",
    },
  ];

  function sortDataToAlphabeticalOrder(data) {
    data.sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
    });
  }

  function getCurrentDate() {
    const date = new Date();
    const month = String(date.getUTCMonth() + 1).padStart(2, 0);
    const day = date.getUTCDate();

    return `${month}-${day}`;
  }

  const toDayDate = getCurrentDate();

  function getBirthFriend(data) {
    const result = data.filter((el) => el.birth.slice(5) === toDayDate);
    return result;
  }

  const birthFriend = getBirthFriend(fakeData);
  sortDataToAlphabeticalOrder(fakeData);

  useEffect(() => {
    if (birthFriend.length) {
      setIsBirthdayOn(true);
    } else {
      setIsBirthdayOn(false);
    }
  }, [false]);

  return (
    <div className="friend-page-container">
      <FriendNav />
      <div className="friend-page-content">
        <MyProfile data={userInfo} />
        {isBirthdayOn && <BirthdayFriend birthData={birthFriend} />}
        <Friends data={fakeData} />
      </div>
    </div>
  );
}

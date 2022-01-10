import React, { useEffect, useState } from "react";
import FriendNav from "../components/friend/FriendNav";
import MyProfile from "../components/friend/MyProfile";
import BirthdayFriend from "../components/friend/BirthdayFriend";
import Friends from "../components/friend/Friends";
import user1 from "../images/friend/user1.png";
import myphoto from "../images/friend/my photo.png";
import search from "../images/friend/search.png";
import { useSelector, useDispatch } from "react-redux";
import { handleKeyword } from "../actions";
import Friend from "../components/friend/Friend";
import "../css/pages/FriendPage.css";

export default function FriendPage() {
  const [isBirthdayOn, setIsBirthdayOn] = useState(false);
  const { isSearchOn } = useSelector((state) => state.SearchOnReducer);
  const { keyWord } = useSelector((state) => state.SearchKeyWordReducer);
  const dispatch = useDispatch();

  const userInfo = {
    photo: myphoto,
    username: "박덕원",
    birth: "1993-01-05",
    song: "행복해서 미안해 - 다비치",
    comment: "My Kakao Talk",
  };

  let fakeData = [
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
      song: "커피 한잔 할래요 - 폴킴",
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
  ].filter((el) => filterDataByKeyWord(el.username, keyWord));

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

  function filterDataByKeyWord(data, keyword) {
    const len = keyword.length;
    const newData = data.split("");
    const arr = [];
    for (let i = 0; i < newData.length; i++) {
      if (i + len <= newData.length) {
        arr.push(newData.slice(i, i + len).join(""));
      }
    }

    const result = arr.filter((el) => el === keyword);
    if (result.length) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (birthFriend.length) {
      setIsBirthdayOn(true);
    } else {
      setIsBirthdayOn(false);
    }
  }, [fakeData]);

  return (
    <div className="friend-page-container">
      <FriendNav />
      <div className="friend-page-content">
        {isSearchOn && (
          <div className="friend-search-bar">
            <img src={search} />
            <input
              placeholder="이름으로 검색"
              onChange={(e) => dispatch(handleKeyword(e.target.value))}
              value={keyWord}
            />
          </div>
        )}
        {keyWord === "" ? (
          <>
            <MyProfile data={userInfo} />
            {isBirthdayOn && <BirthdayFriend birthData={birthFriend} />}
            <Friends data={fakeData} />
          </>
        ) : (
          <div className="friend-page-filtered-content">
            {fakeData.map((el) => (
              <Friend
                key={el.username}
                src={el.photo}
                name={el.username}
                song={el.song}
                comment={el.comment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

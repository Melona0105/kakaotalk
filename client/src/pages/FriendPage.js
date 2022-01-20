import React, { useEffect, useState } from "react";
import FriendNav from "../components/friend/FriendNav";
import MyProfile from "../components/friend/MyProfile";
import BirthdayFriend from "../components/friend/BirthdayFriend";
import Friends from "../components/friend/Friends";
import search from "../images/friend/search.png";
import { useSelector, useDispatch } from "react-redux";
import { handleKeyword, handleIsSearchOn } from "../actions";
import Friend from "../components/friend/Friend";
import { getCurrentTime } from "../functions";
import sample from "../images/seemore/kakao talk.svg";
import "../css/pages/FriendPage.css";

export default function FriendPage({
  isAddFriendOn,
  setIsAddFriendOn,
  myFriend,
}) {
  const [isBirthdayOn, setIsBirthdayOn] = useState(false);
  const { isSearchOn } = useSelector((state) => state.SearchOnReducer);
  const { keyWord } = useSelector((state) => state.SearchKeyWordReducer);
  const dispatch = useDispatch();

  let friendDataFromServer;
  if (!myFriend) {
    friendDataFromServer = [
      {
        photo: sample,
        username: "카카오톡",
        comment: "친구를 추가해보세요",
        option: true,
      },
    ];
  } else {
    friendDataFromServer = myFriend.filter((el) =>
      filterDataByKeyWord(el.username, keyWord)
    );
  }

  function sortDataToAlphabeticalOrder(data) {
    data.sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
    });
  }

  const toDayDate = getCurrentTime("birth");

  function getBirthFriend(data) {
    const result = data.filter(
      (el) => el.birth && el.birth.slice(5) === toDayDate
    );
    return result;
  }

  const birthFriend = getBirthFriend(friendDataFromServer);
  sortDataToAlphabeticalOrder(friendDataFromServer);

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
  }, [friendDataFromServer]);

  return (
    <div className="friend-page-container">
      <FriendNav
        isAddFriendOn={isAddFriendOn}
        setIsAddFriendOn={setIsAddFriendOn}
      />
      <div className="friend-page-content">
        {isSearchOn && (
          <div className="friend-search-bar">
            <img src={search} />
            <input
              placeholder="이름으로 검색"
              onChange={(e) => dispatch(handleKeyword(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  dispatch(handleKeyword(""));
                  dispatch(handleIsSearchOn(!isSearchOn));
                }
              }}
              value={keyWord}
            />
          </div>
        )}
        {keyWord === "" ? (
          <>
            <MyProfile />
            {isBirthdayOn && <BirthdayFriend birthData={birthFriend} />}
            <Friends data={friendDataFromServer} />
          </>
        ) : (
          <div className="friend-page-filtered-content">
            {friendDataFromServer.map((el) => (
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
    </div>
  );
}

import React, { useEffect, useState } from "react";
import FriendNav from "../components/friend/FriendNav";
import MyProfile from "../components/friend/MyProfile";
import BirthdayFriend from "../components/friend/BirthdayFriend";
import Friends from "../components/friend/Friends";
import { useSelector, useDispatch } from "react-redux";
import { handleKeyword, handleIsSearchOn } from "../actions";
import Friend from "../components/friend/Friend";
import {
  getCurrentTime,
  filterDataByKeyWord,
  sortDataToAlphabeticalOrder,
} from "../utils";
import sample from "../images/seemore/kakao talk.svg";
import "../css/pages/FriendPage.css";
import SearchBar from "../components/etc/SearchBar";

export default function FriendPage({ userFriends }) {
  const [isBirthdayOn, setIsBirthdayOn] = useState(false);
  const { isSearchOn } = useSelector((state) => state.SearchOnReducer);
  const { keyWord } = useSelector((state) => state.SearchKeyWordReducer);
  const dispatch = useDispatch();
  let friendDataFromServer;
  if (!userFriends || userFriends.length === 0) {
    friendDataFromServer = [
      {
        photo: sample,
        username: "카카오톡",
        comment: "친구를 추가해보세요",
        option: true,
      },
    ];
  } else {
    friendDataFromServer = userFriends.filter((el) =>
      filterDataByKeyWord(el.username, keyWord)
    );
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

  function searchOnChange(e) {
    dispatch(handleKeyword(e.target.value));
  }

  function searchOnKeyDown(e) {
    if (e.key === "Escape") {
      dispatch(handleKeyword(""));
      dispatch(handleIsSearchOn(!isSearchOn));
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
      <FriendNav />
      <div className="friend-page-content">
        {isSearchOn && (
          <SearchBar
            searchOnChange={searchOnChange}
            searchOnKeyDown={searchOnKeyDown}
            keyWord={keyWord}
          />
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

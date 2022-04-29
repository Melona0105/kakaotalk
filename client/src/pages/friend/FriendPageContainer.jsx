import React from "react";
import FriendNav from "./components/FriendNav";
import MyProfile from "./components/MyProfile";
import SearchBar from "../common/components/SearchBar";
import BirthdayFriend from "./components/BirthdayFriend";
import Friend from "./components/Friend";
import Friends from "./components/Friends";
import useFriendPageContainer from "./FriendPageContainer.hook";
import "./FriendPageContainer.css";

function FriendPageContainer({ userFriends }) {
  const { models, operations } = useFriendPageContainer(userFriends);
  const {
    isSearchOn,
    keyWord,
    isBirthDayFriendOn,
    birthFriend,
    friendDataFromServer,
  } = models;
  const { searchOnChange, searchOnKeyDown } = operations;
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
            {isBirthDayFriendOn && <BirthdayFriend birthData={birthFriend} />}
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

export default FriendPageContainer;

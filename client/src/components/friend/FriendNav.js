import search from "../../images/friend/search.png";
import add from "../../images/friend/add friend.png";
import "../../css/components/friend/FriendNav.css";
import { useDispatch, useSelector } from "react-redux";
import { handleKeyword, handleIsSearchOn } from "../../actions";
import { useState } from "react";
import Popup from "../etc/Popup";

export default function FriendNav({ isAddFriendOn, setIsAddFriendOn }) {
  const { isSearchOn } = useSelector((state) => state.SearchOnReducer);
  const dispatch = useDispatch();

  function handleSearchOn() {
    if (!isSearchOn) {
      dispatch(handleIsSearchOn(!isSearchOn));
    } else {
      dispatch(handleIsSearchOn(!isSearchOn));
      dispatch(handleKeyword(""));
    }
  }

  const popupStyle = `top=450, left=300, width=300, height=430`;
  return (
    <div className="firend-page-nav">
      <div className="firend-page-nav-left">친구</div>
      <div className="firend-page-nav-right">
        <img src={search} onClick={() => handleSearchOn()} />
        <img src={add} onClick={() => setIsAddFriendOn(true)} />
      </div>
      {isAddFriendOn && (
        <Popup
          style={popupStyle}
          url={"/friend"}
          username="add-friend"
          callback={setIsAddFriendOn}
        />
      )}
    </div>
  );
}

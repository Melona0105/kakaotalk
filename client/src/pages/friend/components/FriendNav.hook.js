import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleIsSearchOn, handleKeyword } from "../../../actions";

function useFriendNav() {
  const [isAddFriendOn, setIsAddFriendOn] = useState(false);
  const { isSearchOn } = useSelector((state) => state.SearchOnReducer);
  const dispatch = useDispatch();

  function handleSearchOn() {
    dispatch(handleIsSearchOn(!isSearchOn));
    dispatch(handleKeyword(""));
  }

  function handleIsAddFriendOn() {
    setIsAddFriendOn(!isAddFriendOn);
  }

  const popupStyle = `top=450, left=300, width=300, height=430`;

  return {
    models: { isAddFriendOn, popupStyle },
    operations: { handleIsAddFriendOn, handleSearchOn },
  };
}

export default useFriendNav;

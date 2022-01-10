import search from "../../images/friend/search.png";
import add from "../../images/friend/add friend.png";
import "../../css/components/friend/FriendNav.css";
import { useDispatch, useSelector } from "react-redux";
import { handleKeyword, handleIsSearchOn } from "../../actions";

export default function FriendNav() {
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
  return (
    <div className="firend-page-nav">
      <div className="firend-page-nav-left">친구</div>
      <div className="firend-page-nav-right">
        <img src={search} onClick={() => handleSearchOn()} />
        <img src={add} />
      </div>
    </div>
  );
}

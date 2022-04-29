import search from "../../../images/friend/search.png";
import add from "../../../images/friend/add friend.png";
import "./FriendNav.css";
import Popup from "../../common/components/Popup";
import useFriendNav from "./FriendNav.hook";

function FriendNav() {
  const { models, operations } = useFriendNav();
  const { isAddFriendOn, popupStyle } = models;
  const { handleIsAddFriendOn, handleSearchOn } = operations;
  return (
    <div className="firend-page-nav">
      <div className="firend-page-nav-left">친구</div>
      <div className="firend-page-nav-right">
        <img src={search} onClick={handleSearchOn} />
        <img src={add} onClick={handleIsAddFriendOn} />
      </div>
      {isAddFriendOn && (
        <Popup
          style={popupStyle}
          url={"/friend"}
          username="add-friend"
          callback={handleIsAddFriendOn}
        />
      )}
    </div>
  );
}

export default FriendNav;

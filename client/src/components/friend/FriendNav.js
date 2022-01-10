import search from "../../images/friend/search.png";
import add from "../../images/friend/add friend.png";
import "../../css/components/friend/FriendNav.css";

export default function FriendNav({ isSearchOn, setIsSearchOn }) {
  return (
    <div className="firend-page-nav">
      <div className="firend-page-nav-left">친구</div>
      <div className="firend-page-nav-right">
        <img src={search} onClick={() => setIsSearchOn(!isSearchOn)} />
        <img src={add} />
      </div>
    </div>
  );
}
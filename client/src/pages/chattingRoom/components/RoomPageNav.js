import react from "react";
import search from "../../../images/friend/search.png";
import new_chat from "../../../images/chatting/new chat.png";
import chat_icon from "../../../images/chatting/chatting icon.png";
import "./RoomPageNav.css";
import { useDispatch, useSelector } from "react-redux";
import { handleIsRoomSearchOn, handleRoomKeyword } from "../../../actions";

function RoomPageNav() {
  const { isSearchOn } = useSelector((state) => state.RoomSearchOnReducer);
  const dispatch = useDispatch();

  function handleRoomSerachOn() {
    dispatch(handleIsRoomSearchOn(!isSearchOn));
    dispatch(handleRoomKeyword(""));
  }

  return (
    <div className="rooms-page-nav">
      <div className="rooms-page-nav-left">
        <div>채팅</div>
        <img src={chat_icon} />
      </div>
      <div className="rooms-page-nav-right">
        <img src={search} onClick={() => handleRoomSerachOn()} />
        <img src={new_chat} />
      </div>
    </div>
  );
}

export default RoomPageNav;

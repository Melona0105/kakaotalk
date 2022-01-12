import search from "../../images/friend/search.png";
import new_chat from "../../images/chatting/new chat.png";
import chat_icon from "../../images/chatting/chatting icon.png";
import "../../css/components/chatting room/RoomsNav.css";

export default function RoomsNav() {
  return (
    <div className="rooms-page-nav">
      <div className="rooms-page-nav-left">
        <div>채팅</div>
        <img src={chat_icon} />
      </div>
      <div className="rooms-page-nav-right">
        <img src={search} />
        <img src={new_chat} />
      </div>
    </div>
  );
}

import search from "../../images/friend/search.png";
import new_chat from "../../images/chatting/new chat.png";
import chat_icon from "../../images/chatting/chatting icon.png";
import "../../css/components/chatting/ChattingNav.css";

export default function ChattingNav() {
  return (
    <div className="chatting-page-nav">
      <div className="chatting-page-nav-left">
        <div>채팅</div>
        <img src={chat_icon} />
      </div>
      <div className="chatting-page-nav-right">
        <img src={search} />
        <img src={new_chat} />
      </div>
    </div>
  );
}

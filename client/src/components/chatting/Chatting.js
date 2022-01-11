import friend from "../../images/nav/friend.png";
import "../../css/components/chatting/Chatting.css";

export default function Chatting({ username }) {
  return (
    <>
      <div className="chatting-nav">
        <div></div>
        <div>
          <div>{username}</div>
          <div>
            <img src={friend} />
            <div>2</div>
          </div>
        </div>
      </div>
    </>
  );
}

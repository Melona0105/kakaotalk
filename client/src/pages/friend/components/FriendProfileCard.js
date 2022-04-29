import "./FriendProfileCard.css";
import user1 from "../../../images/friend/user1.png";
import voice_talk from "../../../images/chatting/voice talk.png";
import chatting from "../../../images/nav/chat.png";
import Popup from "../../common/components/Popup";
import edit from "../../../images/Self Edit.png";
import useFriendProfileCard from "./FriendProfileCard.hook";
import { server } from "../../../utils";

function FriendProfileCard() {
  const { models, operations } = useFriendProfileCard();
  const { friendInfo, id, friend_id, isChattingOn, roomStyle, currentRoomId } =
    models;
  const { setIsChattingOn } = operations;

  return (
    <div className="profile-card-container">
      <div className="profile-card-inner-container">
        <div className="profile-inner-top">
          <div className="profile-inner-top-content">
            <img
              src={friendInfo.photo ? `${server}/${friendInfo.photo}` : user1}
            />
            <div>{friendInfo.username}</div>
          </div>
        </div>
        <div className="profile-inner-bottom">
          {id === +friend_id ? (
            <div>
              <div>
                <img
                  className="profile-inner-icon"
                  src={edit}
                  onClick={() => console.log("구현중..")}
                />
                <div>프로필 관리</div>
              </div>
            </div>
          ) : (
            <div>
              <div onClick={() => setIsChattingOn(true)}>
                <img className="profile-inner-icon" src={chatting} />
                <div>1:1 채팅</div>
              </div>
              <div
                onClick={() =>
                  alert("추후 구현 예정입니다. 조금만 기다려주세요")
                }
              >
                <img className="profile-inner-icon" src={voice_talk} />
                <div>통화하기</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isChattingOn && (
        <Popup
          style={roomStyle}
          url={`/room/${currentRoomId}`}
          username={friendInfo.username}
          callback={setIsChattingOn}
        ></Popup>
      )}
    </div>
  );
}

export default FriendProfileCard;

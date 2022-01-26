import { useParams } from "react-router-dom";
import "../../css/components/friend/ProfileCard.css";
import Service from "../../services";
import user1 from "../../images/friend/user1.png";
import voice_talk from "../../images/chatting/voice talk.png";
import chatting from "../../images/nav/chat.png";
import { useEffect, useState } from "react";
import Popup from "../etc/Popup";

export default function ProfileCard() {
  const [isChattingOn, setIsChattingOn] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(undefined);
  const { friend_id } = useParams();
  const [friendInfo, setFriendInfo] = useState({});
  async function getFriendsInfo() {
    const result = await Service.friends.fetchFriendInfo(friend_id);
    setFriendInfo(result);
  }
  const roomStyle = "top=100, left=100, width=375, height=640";

  async function getRoomData() {
    try {
      await Service.rooms.fetchRoomId(friend_id, setCurrentRoomId);
    } catch (err) {
      console.log(err);
    }
  }

  // * TODO : 프렌드 아이디로 데이터 가져오기 --- OK
  useEffect(() => {
    getFriendsInfo();
    getRoomData();
  }, []);

  return (
    <div className="profile-card-container">
      <div className="profile-card-inner-container">
        <div className="profile-inner-top">
          <div className="profile-inner-top-content">
            <img src={friendInfo.photo ? friendInfo.photo : user1} />
            <div>{friendInfo.username}</div>
          </div>
        </div>
        <div className="profile-inner-bottom">
          <div>
            <div>
              <img
                className="profile-inner-icon"
                src={chatting}
                onClick={() => setIsChattingOn(true)}
              />
              <div>1:1 채팅</div>
            </div>
            <div>
              <img className="profile-inner-icon" src={voice_talk} />
              <div>통화하기</div>
            </div>
          </div>
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

import { useParams } from "react-router-dom";
import "../../css/components/friend/ProfileCard.css";
import Service from "../../services";
import user1 from "../../images/friend/user1.png";
import voice_talk from "../../images/chatting/voice talk.png";
import chatting from "../../images/nav/chat.png";
import { useEffect, useState } from "react";
import Popup from "../etc/Popup";
import edit from "../../images/Self Edit.png";
import { useSelector } from "react-redux";
import { getRoomData, server } from "../../utils";

export default function FriendProfileCard() {
  const { id } = useSelector((state) => state.UserInfoReducer);
  const [isChattingOn, setIsChattingOn] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(undefined);
  const { friend_id } = useParams();
  const [friendInfo, setFriendInfo] = useState({});
  async function getFriendsInfo() {
    const result = await Service.friends.fetchFriendInfo(friend_id);
    setFriendInfo(result);
  }
  const roomStyle = "top=100, left=100, width=375, height=640";

  // * TODO : 프렌드 아이디로 데이터 가져오기 --- OK
  useEffect(() => {
    getFriendsInfo();
    getRoomData(friend_id, setCurrentRoomId);
  }, []);

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

import imoticon from "../../../images/chatting/imoticon.png";
import upload from "../../../images/chatting/upload.png";
import schedule from "../../../images/chatting/schedule.png";
import face_talk from "../../../images/chatting/face talk.png";
import voice_talk from "../../../images/chatting/voice talk.png";
import user from "../../../images/friend/user1.png";
import Chatting from "./chattings/Chatting";
import InnerRoomNav from "./InnerRoomNav";
import "./InnerRoom.css";
import useInnerRoom from "./InnerRoom.hook";

function InnerRoom() {
  const { models, operations } = useInnerRoom();
  const { roomData, sortedData, status, message, isMessageFill } = models;
  const { setMessage, sendMsg } = operations;
  // 유저로 필터링해서, 상대방이면 왼쪽에 나면 오른쪽에 뿌린다.
  // 각각을 컴포넌트화 하는게 좋을듯
  // 데이터를 같은 사람 + 1분단위로 묶어서 정리 -> 이걸 뿌려준다.

  return (
    <div className="inner-room-container">
      <InnerRoomNav roomImg={user} roomData={roomData} />
      <div className="inner-room-container-body">
        <Chatting
          chattingData={sortedData}
          roomImg={user}
          roomData={roomData}
        />
      </div>
      <div className="inner-room-container-input">
        <div className="inner-room-input-nav">
          <div className="inner-room-input-nav-left">
            {[imoticon, upload, schedule].map((el) => (
              <img src={el} />
            ))}
          </div>
          <div className="inner-room-input-nav-right">
            {[voice_talk, face_talk].map((el) => (
              <img src={el} />
            ))}
          </div>
        </div>
        <div className="inner-room-input-area">
          {status === 2 ? (
            <div className="block-message">
              차단친구와는 대화가 불가능합니다.
            </div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && isMessageFill) {
                    e.preventDefault();
                    sendMsg();
                  }
                }}
              />
              <div className="send-button-container">
                {isMessageFill ? (
                  <div
                    className="send-button-on"
                    onClick={() => {
                      sendMsg();
                    }}
                  >
                    전송
                  </div>
                ) : (
                  <div className="send-button-off">전송</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InnerRoom;

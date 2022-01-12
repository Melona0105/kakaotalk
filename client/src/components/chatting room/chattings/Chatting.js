import FriendChat from "./FriendChat";
import MyChat from "./MyChat";
import "../../../css/components/chatting room/chattings/Chatting.css";

export default function Chatting({ chattingData, roomImg }) {
  console.log(chattingData);

  return (
    <div className="chatting-container">
      {chattingData.map((el) =>
        el.user === "me" ? (
          <MyChat
            key={el.id}
            username={el.user}
            content={el.content}
            time={el.time}
          />
        ) : (
          <div className="friend-chat-container">
            <div>
              <img src={roomImg} />
            </div>
            <FriendChat
              key={el.id}
              username={el.user}
              content={el.content}
              time={el.time}
            />
          </div>
        )
      )}
    </div>
  );
}

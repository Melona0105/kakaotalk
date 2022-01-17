import react from "react";
import user1 from "../../images/friend/user1.png";
import "../../css/components/friend/Friend.css";
import Melon from "../../components/etc/Melon";

export default function Friend({ id, src, name, comment, music }) {
  const user_id = id;

  // 더블클릭하면, 현재 유저 아이디의 방과 + 클릭한 유저 아이디의 방중 같은 방이 있는지 찾는다.
  // 방이 있다면 그 방으로 연결

  // 방이 없다면, 새로 만들어서 서로 아이디에 그 방을 연결해주고 연결


  return (
    <div
      className="friend-container"
      onDoubleClick={() => console.log(user_id)}
    >
      <div className="friend-profile">
        {src ? <img src={src} /> : <img src={user1} />}
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {music && <Melon music={music} />}
    </div>
  );
}

import user1 from "../../images/friend/user1.png";

export default function FriendStatusCard({ data }) {
  const { photo, username } = data;
  return (
    <div className="friend-status-card-container">
      <div>
        <img src={photo ? photo : user1} />
        <div>{username}</div>
      </div>
      <div className="friend-status-card-option">
        <div>숨김해제</div>
        <div>차단</div>
        <div>삭제</div>
      </div>
    </div>
  );
}

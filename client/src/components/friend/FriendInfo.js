import user1 from "../../images/friend/user1.png";

export default function FriendInfo({ friendInfo }) {
  return (
    <>
      {friendInfo.photo ? <img src={friendInfo.photo} /> : <img src={user1} />}
      <div>{friendInfo.username}</div>
    </>
  );
}

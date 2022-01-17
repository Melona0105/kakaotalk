import user1 from "../../images/friend/user1.png";

export default function AddFriendInfo({ friendInfo }) {
  console.log(friendInfo);
  return (
    <>
      {friendInfo.photo ? <img src={friendInfo.photo} /> : <img src={user1} />}
      <div>{friendInfo.username}</div>
    </>
  );
}

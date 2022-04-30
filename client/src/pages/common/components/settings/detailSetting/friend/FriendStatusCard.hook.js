import client from "../../../../../../Socket";

function useFriendStatusCard() {
  async function handleClickFriendMenu(callback, username) {
    await callback(username);
    client.emit("friends", "data");
  }

  return {
    operations: { handleClickFriendMenu },
  };
}
export default useFriendStatusCard;

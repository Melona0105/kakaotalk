import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Service from "../../../services";
import { getRoomData } from "../../../utils";

function useFriendProfileCard() {
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

  return {
    models: {
      friendInfo,
      id,
      friend_id,
      isChattingOn,
      roomStyle,
      currentRoomId,
    },
    operations: { setIsChattingOn },
  };
}

export default useFriendProfileCard;

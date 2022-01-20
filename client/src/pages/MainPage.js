import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import aixos from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn, handleUserInfo } from "../actions";
import axios from "axios";

export default function MainPage() {
  const { currentPage } = useSelector((state) => state.CurrentPageReducer);
  const [isAddFriendOn, setIsAddFriendOn] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [myFriend, setMyFriend] = useState(undefined);
  const dispatch = useDispatch();
  const { isMsgChange } = useSelector((state) => state.MsgChangeReducer);
  const { id } = useSelector((state) => state.UserInfoReducer);
  const [roomData, setRoomData] = useState([]);
  const [totalNewMsg, setTotalNewMsg] = useState(0);

  // 들어온 데이터 안의 배열들을 순회하면서 거기서 일치하는 값을 뽑아낸다.
  function getNewMessage(array) {
    const answer = [];
    for (let i = 0; i < array.length; i++) {
      const now = array[i];
      answer.push(now.filter((el) => el.user_id !== id && el.view).length);
    }
    return answer;
  }

  function getRoomDataFromServer(serverData) {
    const data = [];
    for (let i = 0; i < serverData.length; i++) {
      const now = serverData[i];
      data.push(now[now.length - 1]);
    }
    // 여기서 바꿔주면 되겠는데?
    data.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    setRoomData(data);
  }

  useEffect(async () => {
    const { userInfo } = await aixos({
      method: "GET",
      url: "http://localhost:4000/users/userinfo",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.data);

    dispatch(handleUserInfo(userInfo));
  }, [currentPage]);

  // TODO : 친구 추가 후, 친구 목록 어떻게 다시 불러오게 할까?
  useEffect(async () => {
    dispatch(handleLoadingOn(true));
    try {
      const { friendData } = await axios({
        method: "GET",
        url: "http://localhost:4000/users/friends",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res) => res.data);
      setMyFriend(friendData);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }, [currentPage, isAddFriendOn, currentPage]);

  // * TODO : 친구 목록이 없으면 어떻게 해줘야할까 --- OK
  // 친구목록이 비었을 경우를 만들어주면 됨

  useEffect(async () => {
    const { rooms } = await axios({
      method: "GET",
      url: "http://localhost:4000/users/rooms",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.data);
    const result = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i]) {
        result.push(rooms[i]);
      }
    }
    setTotalNewMsg(getTotalNewMessage(getNewMessage(result)));
    const answer = applyNewMsgToRoomData(result, getNewMessage(result));
    getRoomDataFromServer(answer);
  }, [isNewData, isMsgChange, currentPage]);

  function getTotalNewMessage(array) {
    return array.reduce((acc, cur) => {
      acc = cur + acc;
      return acc;
    });
  }

  function applyNewMsgToRoomData(roomData, newMsg) {
    // 데이터를 순회하면서 끝에만얘네들을 넣어주면 된다.
    const result = [...roomData];
    for (let i = 0; i < result.length; i++) {
      const now = result[i]; // 이번 차례 배열
      now[now.length - 1].view = newMsg[i];
    }

    return result;
  }

  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} totalNewMsg={totalNewMsg} />
      {currentPage === 0 && (
        <FriendPage
          isAddFriendOn={isAddFriendOn}
          setIsAddFriendOn={setIsAddFriendOn}
          myFriend={myFriend}
        />
      )}
      {currentPage === 1 && (
        <ChattingRoomPage
          isNewData={isNewData}
          roomData={roomData}
          setIsNewData={setIsNewData}
        />
      )}
      {currentPage === 2 && <SeeMorePage />}
    </div>
  );
}

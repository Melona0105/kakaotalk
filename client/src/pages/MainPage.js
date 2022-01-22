import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn, handleUserInfo, handleUserFriends } from "../actions";
import Service from "../services";

export default function MainPage() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.CurrentPageReducer);
  const { userFriends } = useSelector((state) => state.UserFriendsInfoReducer);
  const { isLoadingOn } = useSelector((state) => state.LoadingReducer);
  const [isNewData, setIsNewData] = useState(false);
  const { isMsgChange } = useSelector((state) => state.MsgChangeReducer);
  const { id } = useSelector((state) => state.UserInfoReducer);
  const [roomData, setRoomData] = useState([]);
  const [totalNewMessage, setTotalNewMessage] = useState(0);

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
    data.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    setRoomData(data);
  }

  // TODO : 친구 추가 후, 친구 목록 어떻게 다시 불러오게 할까?
  // * 왜 이러면 한박자 늦을까?
  useEffect(async () => {
    dispatch(handleLoadingOn(true));
    try {
      const userInfo = await Service.user.fetchUserInfo();
      dispatch(handleUserInfo(userInfo));
    } catch (err) {
      throw err;
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }, [currentPage]);

  // TODO : 친구 추가 후, 친구 목록 어떻게 다시 불러오게 할까?
  // ! 리덕스로 왜 둘이 연결이 안될까
  // ! 연결되면 그냥 친구정보를 리덕스로 유지하고 이걸 상태를 바꾸는 식으로 하면 될것 같은데... 왜?
  useEffect(async () => {
    // 데이터 받아오기전에, 로딩 시작
    dispatch(handleLoadingOn(true));
    // 데이터를 받아오기
    try {
      const result = await Service.user.getFriends();
      result
        ? dispatch(handleUserFriends(result.filter((el) => el.status === 0)))
        : dispatch(handleUserFriends([]));
    } catch (err) {
      // 실패할 경우
      console.log(err);
    } finally {
      // 데이터받는 동작이 종료되면, 로딩 종료
      dispatch(handleLoadingOn(false));
    }
    // 페이지 바뀔때
    // ! userFriends 받아오게하면 무한렌더링 걸림 ;
  }, [currentPage]);

  // * TODO : 친구 목록이 없으면 어떻게 해줘야할까 --- OK
  // 친구목록이 비었을 경우를 만들어주면 됨
  // 채팅방의 정보를 읽어오는 함수
  useEffect(async () => {
    const { rooms } = await Service.user.getRooms();
    const result = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i]) {
        result.push(rooms[i]);
      }
    }
    // 새 메세지 개수 세기
    const newMsg = getNewMessage(result);
    // 전체 개수 세기
    const totalNewMsg = getTotalNewMessage(newMsg);

    setTotalNewMessage(totalNewMsg);
    const answer = applyNewMsgToRoomData(result, newMsg);
    getRoomDataFromServer(answer);
  }, [isNewData, isMsgChange, currentPage, userFriends]);

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
      <Nav currentPage={currentPage} totalNewMessage={totalNewMessage} />
      {currentPage === 0 && <FriendPage userFriends={userFriends} />}
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

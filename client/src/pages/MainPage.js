import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn, handleUserInfo, handleUserFriends } from "../actions";
import Service from "../services";
import client from "../Socket";

export default function MainPage() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.CurrentPageReducer);
  const { userFriends } = useSelector((state) => state.UserFriendsInfoReducer);
  const { id } = useSelector((state) => state.UserInfoReducer);
  const [roomData, setRoomData] = useState([]);
  const [totalNewMessage, setTotalNewMessage] = useState(0);
  const { isMsgChange } = useSelector((state) => state.MsgChangeReducer);

  useEffect(() => {
    client.on("friends", () => {
      // 여기도 socket 연결을 해놓고, 새로 데이터가 올때마다 새로 렌더링한다.
      console.log("friends 수신");
      getFriendsData();
      getUserData();
      // getRoomsData();
    });

    return () => {
      client.off("friends");
    };
  }, []);

  useEffect(() => {
    client.on("message", () => {
      console.log("message 수신");
      getRoomsData();
    });
    return () => {
      client.off("message");
    };
  }, []);

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

  // * 친구 추가 후, 친구 목록 어떻게 다시 불러오게 할까? ---- OK
  // axios 인스턴스 만들때, 헤더를 고정으로 박았더니, 한번만 불려서 이전 헤더가 들어옴
  // 인터셉터를 이용해서 가로챌때마다 헤더가 새로 생성되도록 수정함
  useEffect(() => {
    getFriendsData();
    getUserData();
    getRoomsData();
  }, [currentPage, isMsgChange]);

  async function getUserData() {
    dispatch(handleLoadingOn(true));
    try {
      const userInfo = await Service.users.fetchUserInfo();
      dispatch(handleUserInfo(userInfo));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  // * 친구 추가 후, 친구 목록 어떻게 다시 불러오게 할까? ---OK
  // 처음에는 리덕스로 해봤는데, 리덕스는 새창열린거는 못 넘어가기때문에 웹소켓으로 해결함

  async function getFriendsData() {
    // 데이터 받아오기전에, 로딩 시작
    dispatch(handleLoadingOn(true));
    // 데이터를 받아오기
    try {
      const result = await Service.users.fetchFriends();
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
  }

  // * TODO : 친구 목록이 없으면 어떻게 해줘야할까 --- OK
  // 친구목록이 비었을 경우를 만들어주면 됨
  // 채팅방의 정보를 읽어오는 함수

  async function getRoomsData() {
    dispatch(handleLoadingOn(true));
    try {
      const { rooms } = await Service.users.getRooms();
      const result = [];
      if (rooms && id !== undefined) {
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i].length) {
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
      } else {
        getRoomDataFromServer(result);
      }
    } catch (err) {
      // 실패할 경우
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

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
      {currentPage === 1 && <ChattingRoomPage roomData={roomData} />}
      {currentPage === 2 && <SeeMorePage />}
    </div>
  );
}

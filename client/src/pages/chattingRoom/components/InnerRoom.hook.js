import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Service from "../../../services";
import client from "../../../Socket";
import { getCurrentTime, sortChatData } from "../../../utils";

function useInnerRoom() {
  // 현재 대화하는 사람의 데이터 이거 받아와서 넣어줘야함
  // 이 룸 아이디로 채팅데이터가져온다.
  const { room_id } = useParams();
  const [currentChat, setCurrentChat] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [roomData, setRoomData] = useState({});
  const { id, username } = useSelector((state) => state.UserInfoReducer);
  const [message, setMessage] = useState("");
  const [isMessageFill, setIsMessageFill] = useState(false);
  // 메세지 변화를 리덕스에 넣고, 그거 바뀌면 전부다 알림이 새로고침 되도록 하기
  const { status } = roomData;

  useEffect(() => {
    client.on("message", (message) => {
      // 여기도 socket 연결을 해놓고, 새로 데이터가 올때마다 새로 렌더링한다.
      getChattings();
      getRoomInfo();
      setCurrentChat([...currentChat, message]);
    });

    // 채팅 내용들을 가져오는 함수 처음에만 가져오고 다시들어오면 그때 넣어준다.
    getChattings();
    getRoomInfo();

    // return () => {
    //   client.close();
    // };
  }, []);

  // 우선은 준걸 그대로 줘야 빠르게 되니 폼에 담아서 준다.
  // 서버로 데이터를 전송하는 함수
  // ? 서버로 데이터를 전송하고, 그 후, 바뀐 데이터를 받아오는데
  // * 채팅에 그냥 room_id를 담아서 보내보자
  // 이것을 웹소켓을 이용하면
  function sendMsg() {
    const newMsg = {
      user_id: id,
      room_id,
      username,
      content: "123",
      time: getCurrentTime(),
      view: 1,
    };

    newMsg.content = message;
    const sendData = { room_id, newMsg };
    // 데이터 전송
    client.emit("message", sendData);
    setMessage("");
    // dispatch(handleIsMsgChange(!isMsgChange));
  }

  useEffect(() => {
    if (message) {
      setIsMessageFill(true);
    } else {
      setIsMessageFill(false);
    }
  }, [message]);

  async function getChattings() {
    try {
      await Service.chats.fetchRoomChats(room_id, setCurrentChat);
    } catch (err) {
      console.log(err);
    }
  }

  async function getRoomInfo() {
    // 방 주인의 데이터를 가져오는 함수
    try {
      await Service.rooms.fetchRoomInfo(room_id, id, setRoomData);
    } catch (err) {
      console.log(err);
    }
  }

  // 채팅을 새로보내면 새로 렌더링하게 하는 함수
  useEffect(() => {
    let nextState = [...currentChat];
    nextState = sortChatData(nextState);
    setSortedData(nextState);
  }, [currentChat]);

  return {
    models: { roomData, sortedData, status, message, isMessageFill },
    operations: { setMessage, sendMsg },
  };
}

export default useInnerRoom;

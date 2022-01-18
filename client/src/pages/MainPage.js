import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import aixos from "axios";
import { useDispatch } from "react-redux";
import { handleLoadingOn, handleUserInfo } from "../actions";
import axios from "axios";

export default function MainPage() {
  const [currentPage, setIsCurrentPage] = useState(0);
  const [isAddFriendOn, setIsAddFriendOn] = useState(false);

  const [myFriend, setMyFriend] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(async () => {
    const { userInfo } = await aixos({
      method: "GET",
      url: "http://localhost:4000/users/userinfo",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.data);

    dispatch(handleUserInfo(userInfo));
  }, [currentPage]);

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
  }, [currentPage, isAddFriendOn]);

  // 친구 목록이 없으면 어떻게 해줘야할까
  // 1 친구목록도 리덕스에 담는다.

  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} setIsCurrentPage={setIsCurrentPage} />
      {currentPage === 0 && (
        <FriendPage
          isAddFriendOn={isAddFriendOn}
          setIsAddFriendOn={setIsAddFriendOn}
          myFriend={myFriend}
        />
      )}
      {currentPage === 1 && <ChattingRoomPage />}
      {currentPage === 2 && <SeeMorePage />}
    </div>
  );
}

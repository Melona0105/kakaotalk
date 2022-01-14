import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import aixos from "axios";

export default function MainPage() {
  const [currentPage, setIsCurrentPage] = useState(0);
  const [userInfo, setUserInfo] = useState({
    photo: undefined,
    username: undefined,
    email: undefined,
    birth: undefined,
    song: undefined,
    comment: undefined,
  });

  useEffect(async () => {
    const { data } = await aixos({
      method: "GET",
      url: "http://localhost:4000/users",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.data);
    setUserInfo(data);
  }, [currentPage]);

  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} setIsCurrentPage={setIsCurrentPage} />
      {currentPage === 0 && <FriendPage userInfo={userInfo} />}
      {currentPage === 1 && <ChattingRoomPage />}
      {currentPage === 2 && <SeeMorePage userInfo={userInfo} />}
    </div>
  );
}

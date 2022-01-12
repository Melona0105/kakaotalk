import { useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import myphoto from "../images/friend/my photo.png";

export default function MainPage() {
  const [currentPage, setIsCurrentPage] = useState(0);

  const userInfo = {
    photo: myphoto,
    username: "박덕원",
    email: "pdwtop2509@gmail.com",
    birth: "1993-01-05",
    song: "행복해서 미안해 - 다비치",
    comment: "My Kakao Talk",
  };

  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} setIsCurrentPage={setIsCurrentPage} />
      {currentPage === 0 && <FriendPage userInfo={userInfo} />}
      {currentPage === 1 && <ChattingRoomPage />}
      {currentPage === 2 && <SeeMorePage userInfo={userInfo} />}
    </div>
  );
}

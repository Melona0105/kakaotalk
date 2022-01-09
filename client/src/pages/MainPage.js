import { useState } from "react";
import Nav from "../components/Nav";
import FriendPage from "../pages/FriendPage";
import '../css/pages/MainPage.css'

export default function MainPage() {
  // 현재페이지를 나타내는 상태 -> 친구를 선택하면 친구페이지, 이런 식으로
  const [currentPage, setIsCurrentPage] = useState(1);
  return (
    <div className="mainpage-container">
      <Nav />
      {currentPage === 1 && <FriendPage />}
    </div>
  );
}

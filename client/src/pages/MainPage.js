import { useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";

export default function MainPage() {
  // 현재페이지를 나타내는 상태 -> 친구를 선택하면 친구페이지, 이런 식으로
  const [currentPage, setIsCurrentPage] = useState(0);
  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} setIsCurrentPage={setIsCurrentPage} />
      {currentPage === 0 && <FriendPage />}
    </div>
  );
}

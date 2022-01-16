import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import FriendPage from "../pages/FriendPage";
import "../css/pages/MainPage.css";
import ChattingRoomPage from "./ChattingRoomPage";
import SeeMorePage from "./SeeMorePage";
import aixos from "axios";
import { useDispatch } from "react-redux";
import { handleUserInfo } from "../actions";

export default function MainPage() {
  const [currentPage, setIsCurrentPage] = useState(0);
  const dispatch = useDispatch();
  useEffect(async () => {
    const { data } = await aixos({
      method: "POST",
      url: "http://localhost:4000/users/userinfo",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.data);
    dispatch(handleUserInfo(data));
  }, [currentPage]);

  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} setIsCurrentPage={setIsCurrentPage} />
      {currentPage === 0 && <FriendPage />}
      {currentPage === 1 && <ChattingRoomPage />}
      {currentPage === 2 && <SeeMorePage />}
    </div>
  );
}

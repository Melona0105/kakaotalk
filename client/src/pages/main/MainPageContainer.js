import "./MainPage.css";
import Nav from "../../components/nav/Nav";
import ChattingRoomPage from "../ChattingRoomPage";
import FriendPageContainer from "../friend/FriendPageContainer";
import SeeMorePage from "../SeeMorePage";
import useMainPageContainer from "./MainpageContainer.hook";

function MainPageContainer() {
  const { models } = useMainPageContainer();
  const { currentPage, totalNewMessage, userFriends, roomData } = models;
  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} totalNewMessage={totalNewMessage} />
      {currentPage === 0 && <FriendPageContainer userFriends={userFriends} />}
      {currentPage === 1 && <ChattingRoomPage roomData={roomData} />}
      {currentPage === 2 && <SeeMorePage />}
    </div>
  );
}

export default MainPageContainer;

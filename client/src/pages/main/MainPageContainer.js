import "./MainPage.css";
import Nav from "../../components/nav/Nav";
import FriendPageContainer from "../friend/FriendPageContainer";
import SeeMorePageContainer from "../seemore/SeeMorePageContainer";
import useMainPageContainer from "./MainpageContainer.hook";
import ChattingRoomPageContainer from "../chattingRoom/ChattingRoomPageContainer";

function MainPageContainer() {
  const { models } = useMainPageContainer();
  const { currentPage, totalNewMessage, userFriends, roomData } = models;
  return (
    <div className="mainpage-container">
      <Nav currentPage={currentPage} totalNewMessage={totalNewMessage} />
      {currentPage === 0 && <FriendPageContainer userFriends={userFriends} />}
      {currentPage === 1 && <ChattingRoomPageContainer roomData={roomData} />}
      {currentPage === 2 && <SeeMorePageContainer />}
    </div>
  );
}

export default MainPageContainer;

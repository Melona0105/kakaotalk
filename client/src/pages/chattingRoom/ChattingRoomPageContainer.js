import "./ChattingPage.css";
import RoomPageNav from "./components/RoomPageNav";
import Room from "./components/Room";
import SearchBar from "../common/components/SearchBar";
import useChattingRoomPageContainer from "./ChattingRoomPageContainer.hook";

function ChattingRoomPageContainer({ roomData }) {
  const { models, operations } = useChattingRoomPageContainer(roomData);
  const { isSearchOn, keyWord, statusZeroRoomData, filterRoomData } = models;
  const { searchOnChange, searchOnKeyDown } = operations;
  return (
    <div className="chatting-page-container">
      <RoomPageNav />
      {isSearchOn && (
        <SearchBar
          searchOnChange={searchOnChange}
          searchOnKeyDown={searchOnKeyDown}
          keyWord={keyWord}
        />
      )}
      <div className="chatting-page-content">
        {statusZeroRoomData.length ? (
          keyWord.length ? (
            filterRoomData.map((el) => <Room key={el.username} data={el} />)
          ) : (
            statusZeroRoomData.map((el) => <Room key={el.username} data={el} />)
          )
        ) : (
          <div className="chatting-page-blank">
            <div>아직 대화가 없어요.</div>
            <div>새로운 대화를 시작해보세요.</div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ChattingRoomPageContainer;

import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";
import { useSelector, useDispatch } from "react-redux";
import { handleRoomKeyword, handleIsRoomSearchOn } from "../actions";
import SearchBar from "../components/etc/SearchBar";
import { filterDataByKeyWord } from "../utils";

export default function ChattingPage({ roomData }) {
  const dispatch = useDispatch();
  const { keyWord } = useSelector((state) => state.RoomSearchKeyWordReducer);
  const { isSearchOn } = useSelector((state) => state.RoomSearchOnReducer);
  const a = roomData.filter((el) => el.status === 0);

  function searchOnChange(e) {
    dispatch(handleRoomKeyword(e.target.value));
  }

  function searchOnKeyDown(e) {
    if (e.key === "Escape") {
      dispatch(handleRoomKeyword(""));
      dispatch(handleIsRoomSearchOn(!isSearchOn));
    }
  }

  let filterRoomData = roomData.filter((el) =>
    filterDataByKeyWord(el.username, keyWord)
  );

  return (
    <div className="chatting-page-container">
      <RommPageNav />
      {isSearchOn && (
        <SearchBar
          searchOnChange={searchOnChange}
          searchOnKeyDown={searchOnKeyDown}
          keyWord={keyWord}
        />
      )}
      <div className="chatting-page-content">
        {a.length ? (
          keyWord.length ? (
            filterRoomData.map((el) => <Room key={el.username} data={el} />)
          ) : (
            a.map((el) => <Room key={el.username} data={el} />)
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

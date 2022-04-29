import { useDispatch, useSelector } from "react-redux";
import { handleIsRoomSearchOn, handleRoomKeyword } from "../../actions";
import { filterDataByKeyWord } from "../../utils";

function useChattingRoomPageContainer(roomData) {
  const dispatch = useDispatch();
  const { keyWord } = useSelector((state) => state.RoomSearchKeyWordReducer);
  const { isSearchOn } = useSelector((state) => state.RoomSearchOnReducer);
  const statusZeroRoomData = roomData.filter((el) => el.status === 0);

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

  return {
    models: { isSearchOn, keyWord, statusZeroRoomData, filterRoomData },
    operations: { searchOnChange, searchOnKeyDown },
  };
}

export default useChattingRoomPageContainer;

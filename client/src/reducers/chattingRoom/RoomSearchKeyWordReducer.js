import { currentRoomKeyword } from "../InitialState";
import { roomKeyWord } from "../../actions";

// 검색 키워드 유지
const RoomSearchKeyWordReducer = (state = currentRoomKeyword, action) => {
  switch (action.type) {
    case roomKeyWord:
      return Object.assign({}, state, { keyWord: action.paylaod });

    default:
      return state;
  }
};

export default RoomSearchKeyWordReducer;

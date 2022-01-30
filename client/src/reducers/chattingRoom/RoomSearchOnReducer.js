import { isRoomSearchOn } from "../InitialState";
import { roomSearchOn } from "../../actions";

// 다른 창 다녀와도 검색 켜진거 유지
const RoomSearchOnReducer = (state = isRoomSearchOn, action) => {
  switch (action.type) {
    case roomSearchOn:
      return Object.assign({}, state, { isSearchOn: action.paylaod });

    default:
      return state;
  }
};

export default RoomSearchOnReducer;

import { isSearchOn } from "../InitialState";
import { searchOn } from "../../actions";

// 다른 창 다녀와도 검색 켜진거 유지
const SearchOnReducer = (state = isSearchOn, action) => {
  switch (action.type) {
    case searchOn:
      return Object.assign({}, state, { isSearchOn: action.paylaod });

    default:
      return state;
  }
};

export default SearchOnReducer;

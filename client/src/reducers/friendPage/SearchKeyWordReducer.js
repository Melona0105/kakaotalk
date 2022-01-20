import { currentKeyword } from "../InitialState";
import { keyWord } from "../../actions";

// 검색 키워드 유지
const SearchKeyWordReducer = (state = currentKeyword, action) => {
  switch (action.type) {
    case keyWord:
      return Object.assign({}, state, { keyWord: action.paylaod });

    default:
      return state;
  }
};

export default SearchKeyWordReducer;

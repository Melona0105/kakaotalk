import { currentKeyword } from "./InitialState";
import { keyWord } from "../actions";

const SearchKeyWordReducer = (state = currentKeyword, action) => {
  switch (action.type) {
    case keyWord:
      return Object.assign({}, state, { keyWord: action.paylaod });

    default:
      return state;
  }
};

export default SearchKeyWordReducer;

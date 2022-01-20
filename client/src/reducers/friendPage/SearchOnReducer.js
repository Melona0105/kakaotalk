import { isSearchOn } from "../InitialState";
import { searchOn } from "../../actions";

const SearchOnReducer = (state = isSearchOn, action) => {
  switch (action.type) {
    case searchOn:
      return Object.assign({}, state, { isSearchOn: action.paylaod });

    default:
      return state;
  }
};

export default SearchOnReducer;

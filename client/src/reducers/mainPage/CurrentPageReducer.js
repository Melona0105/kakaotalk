import { currentPage } from "../InitialState";
import { currentPageCase } from "../../actions";

const CurrentPageReducer = (state = currentPage, action) => {
  switch (action.type) {
    case currentPageCase:
      return Object.assign({}, state, { currentPage: action.paylaod });

    default:
      return state;
  }
};

export default CurrentPageReducer;

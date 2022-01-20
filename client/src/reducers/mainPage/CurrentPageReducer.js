import { currentPage } from "../InitialState";
import { currentPageCase } from "../../actions";

// 새로고침해도 현재 페이지 유지하기 위함
const CurrentPageReducer = (state = currentPage, action) => {
  switch (action.type) {
    case currentPageCase:
      return Object.assign({}, state, { currentPage: action.paylaod });

    default:
      return state;
  }
};

export default CurrentPageReducer;

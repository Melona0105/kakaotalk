import { isLoadingOn } from "../InitialState";
import { loadingCase } from "../../actions";

// 로딩상태만들기
const LoadingRedcuer = (state = isLoadingOn, action) => {
  switch (action.type) {
    case loadingCase:
      return Object.assign({}, state, { isLoadingOn: action.paylaod });

    default:
      return state;
  }
};

export default LoadingRedcuer;

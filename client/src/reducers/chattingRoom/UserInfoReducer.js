import { userInfo } from "../InitialState";
import { userInfoCase } from "../../actions";

// 유저 정보를 가져와서 전역에 보관하기 위한 리듀서
const UserInfoReducer = (state = userInfo, action) => {
  switch (action.type) {
    case userInfoCase:
      if (action.paylaod === undefined) {
        return Object.assign({}, userInfo);
      } else {
        return Object.assign({}, state, action.paylaod);
      }

    default:
      return state;
  }
};

export default UserInfoReducer;

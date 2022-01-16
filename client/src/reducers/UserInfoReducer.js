import { userInfo } from "./InitialState";
import { userInfoCase } from "../actions";

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

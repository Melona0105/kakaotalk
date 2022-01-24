import { isBirthDayFriendOn } from "../InitialState";
import { birthDayOption } from "../../actions";

// 생일옵션변경
const BirthFriendReducer = (state = isBirthDayFriendOn, action) => {
  switch (action.type) {
    case birthDayOption:
      return Object.assign({}, state, { isBirthDayFriendOn: action.paylaod });

    default:
      return state;
  }
};

export default BirthFriendReducer;

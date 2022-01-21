import { userFriends } from "../InitialState";
import { userFriendsInfo } from "../../actions";

const UserFriendsInfoReducer = (state = userFriends, action) => {
  switch (action.type) {
    case userFriendsInfo:
      return Object.assign({}, state, { userFriends: action.paylaod });

    default:
      return state;
  }
};

export default UserFriendsInfoReducer;

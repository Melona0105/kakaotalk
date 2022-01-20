import { newMsg } from "../InitialState";
import { newMessageCase } from "../../actions";

const NewMessageReducer = (state = newMsg, action) => {
  switch (action.type) {
    case newMessageCase:
      return Object.assign({}, state, {
        room_id: action.paylaod.room_id,
        newMsg: action.paylaod.newMsg,
      });

    default:
      return state;
  }
};

export default NewMessageReducer;

import { messageLength } from "./InitialState";
import { newMessageCase } from "../actions";

const NewMessageReducer = (state = messageLength, action) => {
  switch (action.type) {
    case newMessageCase:
      return Object.assign({}, state, { messageLength: action.paylaod });

    default:
      return state;
  }
};

export default NewMessageReducer;

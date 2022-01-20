import { isMsgChange } from "../InitialState";
import { isMsgChangeCase } from "../../actions";

const MsgChangeReducer = (state = isMsgChange, aciton) => {
  switch (aciton.type) {
    case isMsgChangeCase:
      return Object.assign({}, state, { isMsgChange: aciton.paylaod });

    default:
      return state;
  }
};

export default MsgChangeReducer;

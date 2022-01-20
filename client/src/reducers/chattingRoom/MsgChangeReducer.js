import { isMsgChange } from "../InitialState";
import { isMsgChangeCase } from "../../actions";

// 새 메세지가 있는지 확인
const MsgChangeReducer = (state = isMsgChange, aciton) => {
  switch (aciton.type) {
    case isMsgChangeCase:
      return Object.assign({}, state, { isMsgChange: aciton.paylaod });

    default:
      return state;
  }
};

export default MsgChangeReducer;

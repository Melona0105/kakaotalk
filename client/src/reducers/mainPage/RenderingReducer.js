import { isRendering } from "../InitialState";
import { isRenderCase } from "../../actions";

const RenderingReducer = (state = isRendering, action) => {
  switch (action.type) {
    case isRenderCase:
      return Object.assign({}, state, { isRendering: action.paylaod });

    default:
      return state;
  }
};

export default RenderingReducer;

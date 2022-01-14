import { currentIsLogin } from "./InitialState";
import { handleLoginCase } from "../actions";

const LoginReducer = (state = currentIsLogin, action) => {
  switch (action.type) {
    case handleLoginCase:
      return Object.assign({}, state, { isLogin: action.paylaod });

    default:
      return state;
  }
};

export default LoginReducer;

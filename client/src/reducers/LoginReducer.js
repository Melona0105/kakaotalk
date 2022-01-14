import { currentIsLogin } from "./InitialState";
import { handleLogin } from "../actions";

const LoginReducer = (state = currentIsLogin, action) => {
  switch (action.type) {
    case handleLogin:
      return Object.assign({}, state, { isLogin: action.paylaod });

    default:
      return state;
  }
};

export default LoginReducer;

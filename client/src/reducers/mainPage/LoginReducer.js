import { currentIsLogin } from "../InitialState";
import { handleLoginCase } from "../../actions";

// 로그인 상태유지
const LoginReducer = (state = currentIsLogin, action) => {
  switch (action.type) {
    case handleLoginCase:
      return Object.assign({}, state, { isLogin: action.paylaod });

    default:
      return state;
  }
};

export default LoginReducer;

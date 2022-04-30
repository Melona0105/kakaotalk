import kakao from "../../images/Kakao.png";
import "./Login.css";
import { Link } from "react-router-dom";

import LoginInput from "./LoginInput";
import useLogin from "./Login.hook";

export default function Login() {
  const { models, operations } = useLogin();
  const { inputs, isInputFill, email, password, isLoginError } = models;
  const { enterLogin } = operations;
  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="login-inner-container-header">
          <img src={kakao} />
        </div>
        <div className="login-inner-container-body">
          {inputs.map((el) => (
            <LoginInput
              key={el.type}
              type={el.type}
              initView={el.initView}
              content={el.content}
              enterLogin={enterLogin}
              callback={el.callback}
            />
          ))}
          {isInputFill ? (
            <div
              className="login-button-on"
              onClick={() => {
                if (email && password) {
                  enterLogin();
                }
              }}
            >
              로그인
            </div>
          ) : (
            <div className="login-button">로그인</div>
          )}
          <div className="auto-login">
            <input type="checkbox" />
            <div>실행시 자동 로그인</div>
          </div>
          {isLoginError && (
            <div className="login-error">
              카카오계정 또는 비빌번호를 다시 확인해 주세요.
            </div>
          )}
        </div>
        <div className="login-inner-container-footer">
          <Link className="link-button" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import kakao from "../../images/Kakao.png";
import "../../css/components/users/Login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleIsLogin, handleLoadingOn } from "../../actions";

import LoginInput from "./LoginInput";
import Service from "../../services";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const dispatch = useDispatch();

  async function handleLogin(email, password, callback) {
    setIsLoginError(false);
    dispatch(handleLoadingOn(true));

    try {
      await Service.user.login(email, password);
      callback();
    } catch (err) {
      setIsLoginError(true);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  const inputs = [
    {
      type: "text",
      initView: "카카오계정(이메일)",
      content: email,
      callback: setEmail,
    },
    {
      type: "password",
      initView: "비밀번호",
      content: password,
      callback: setPassword,
    },
  ];

  function enterLogin() {
    handleLogin(email, password, () => {
      dispatch(handleIsLogin(true));
    });
  }

  // 입력된 값이 있으면, 버튼 활성화시키기
  useEffect(() => {
    email.length >= 3 && password.length >= 3
      ? setIsInputFill(true)
      : setIsInputFill(false);
  }, [email, password]);

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
          {/* <Link className="link-button" to="/account">
            계정 찾기
          </Link>
          <div className="login-center-bar"></div> */}
          <Link className="link-button" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

import react from "react";
import kakao from "../images/Kakao.png";
import "../css/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="login-inner-container-header">
          <img src={kakao} />
        </div>
        <div className="login-inner-container-body">
          <input className="login-data-input"></input>
          <input className="login-data-input"></input>
          <div className="login-button">로그인</div>
          <div className="auto-login">
            <input type="checkbox" />
            <div>실행시 자동 로그인</div>
          </div>
        </div>
        <div className="login-inner-container-footer">
          <div className="login-find-account">카카오계정 찾기</div>
          <div className="login-center-bar"></div>
          <div className="login-reset-password">비밀번호 재설정</div>
        </div>
      </div>
    </div>
  );
}

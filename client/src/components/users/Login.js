import react from "react";
import kakao from "../../images/Kakao.png";
import "../../css/components/users/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="login-inner-container-header">
          <img src={kakao} />
        </div>
        <div className="login-inner-container-body">
          <input></input>
          <input></input>
          <div className="login-button">로그인</div>
          <div className="auto-login">
            <input type="checkbox" />
            <div>실행시 자동 로그인</div>
          </div>
        </div>
        <div className="login-inner-container-footer">
          <Link className="link-button" to="/account">
            계정 찾기
          </Link>
          <div className="login-center-bar"></div>
          <Link className="link-button" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

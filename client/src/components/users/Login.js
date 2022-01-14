import react, { useState } from "react";
import kakao from "../../images/Kakao.png";
import "../../css/components/users/Login.css";
import { Link } from "react-router-dom";
import { handleLogin } from "../../controllers/users/Login";

export default function Login({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="login-inner-container-header">
          <img src={kakao} />
        </div>
        <div className="login-inner-container-body">
          <input
            placeholder="카카오계정(이메일)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div
            className="login-button"
            onClick={() => {
              if (email && password) {
                handleLogin(email, password, setIsLogin);
              }
            }}
          >
            로그인
          </div>
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

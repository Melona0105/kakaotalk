import react, { useState } from "react";
import kakao from "../../images/Kakao.png";
import "../../css/components/users/Login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleIsLogin, handleLoadingOn } from "../../actions";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleLogin(email, password, callback) {
    try {
      await dispatch(handleLoadingOn(true));
      const result = await axios({
        method: "POST",
        url: "http://localhost:4000/users/login",
        data: { email, password },
        withCredentials: true,
      });

      const { accessToken } = result.data;

      // 받은 토큰을 로컬스토리지에 저장한다.
      localStorage.setItem("token", accessToken);
      await dispatch(handleLoadingOn(false));
      callback();
    } catch (err) {
      console.log("이메일 또는 비밀번호를 다시 확인해주세요.");
      await dispatch(handleLoadingOn(false));
    }
  }

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
                handleLogin(email, password, () => {
                  dispatch(handleIsLogin(true));
                });
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
          {/* 여기서 리다이렉트 바로 로그인시켜버리기 고민 */}
          <Link className="link-button" to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

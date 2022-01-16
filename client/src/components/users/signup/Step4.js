import { useEffect, useState } from "react";
import "../../../css/components/users/signup/Step4.css";
import RemoveButton from "../../etc/RomoveButton";
import DateDropDowns from "./DateDropDowns";
import ProgressBar from "./ProgressBar";
import RadioBox from "./RadioBox";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleIsLogin, handleLoadingOn } from "../../../actions";
import axios from "axios";

export default function Step4({ currentUserInfo }) {
  const [userBirth, setUserBirth] = useState(undefined);
  const [isNameFill, setIsNameFill] = useState(false);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState({ ...currentUserInfo });
  const radioData = [
    { value: "male", title: "남성" },
    { value: "female", title: "여성" },
    { value: "none", title: "선택안함" },
  ];
  const dispatch = useDispatch();

  async function handleSignup(userInfo, callBack) {
    const { email, username, password, userBirth, agreements } = userInfo;
    try {
      dispatch(handleLoadingOn(true));
      await axios({
        method: "POST",
        url: "http://localhost:4000/users/signup",
        withCredentials: true,
        data: { email, username, password, userBirth, agreements },
      })
        .then(async (res) => {
          const result = await axios({
            method: "POST",
            url: "http://localhost:4000/users/login",
            data: { email, password },
            withCredentials: true,
          });

          const { accessToken } = result.data;

          localStorage.setItem("token", accessToken);
          callBack();
          dispatch(handleLoadingOn(false));
        })
        .catch((err) => {
          const { status } = err.response;
          if (status === 401) {
            console.log("이미 가입된 계정입니다.");
          }
          dispatch(handleLoadingOn(false));
        });
      // 성공적으로 가입이 되었으니 현재 입력한 것들로 로그인시켜주기
    } catch (err) {
      console.log("서버 에러가 발생했습니다.");
      dispatch(handleLoadingOn(false));
    }
  }

  useEffect(() => {
    username.length ? setIsNameFill(true) : setIsNameFill(false);
  }, [username]);

  useEffect(() => {
    setUserInfo({ ...currentUserInfo, userBirth, username });
  }, [userBirth, username]);

  console.log(userInfo);
  return (
    <div className="step4-container">
      <div className="step4-inner-container">
        <ProgressBar width="100%" />
        <div className="step4-header">
          <div>
            카카오계정 프로필을
            <br />
            설정해 주세요.
          </div>
        </div>
        <div className="step4-body">
          <div className="step4-username">
            <div>닉네임</div>
            <div>
              <div className="step4-username-input">
                <input
                  placeholder="닉네임 입력"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {isNameFill && (
                  <RemoveButton
                    callback={() => {
                      setUsername("");
                    }}
                  />
                )}
                <div>8/20</div>
              </div>
              {!isNameFill && (
                <div className="step4-username-error">
                  닉네임을 입력해 주세요.
                </div>
              )}
            </div>
          </div>
          <div className="step4-birth">
            <div>생일</div>
            <div className="step4-birth-dropdowns">
              <div>
                <DateDropDowns getUserbirth={setUserBirth} />
              </div>
              <input type="checkbox" id="date" className="outdate" />
              <label className="step4-checkbox" htmlFor="date"></label>
              <label htmlFor="date">음력</label>
            </div>
          </div>
          <div className="step4-gender">
            <div>성별</div>
            <div className="step4-gender-select-box">
              {radioData.map((el) => (
                <RadioBox
                  key={el.value}
                  value={el.value}
                  name="gender-select"
                  title={el.title}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="step4-footer">
          {!isNameFill ? (
            <div className="step4-submit-off">확인</div>
          ) : (
            <Link
              to="/"
              className="step4-submit-on"
              onClick={() => {
                handleSignup(userInfo, () => {
                  dispatch(handleIsLogin(true));
                });
              }}
            >
              확인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

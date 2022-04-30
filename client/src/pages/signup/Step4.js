import "./Step4.css";
import RemoveButton from "../../pages/common/components/RemoveButton";
import DateDropDown from "./DateDropDown";
import ProgressBar from "./ProgressBar";
import RadioBox from "./RadioBox";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleIsLogin } from "../../actions";
import useStep4 from "./Step4.hook";

export default function Step4({ currentUserInfo }) {
  const { models, operations } = useStep4(currentUserInfo);
  const { username, isNameFill, radioData, userInfo } = models;
  const { setUsername, setUserBirth, handleSignup } = operations;
  const dispatch = useDispatch();
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
                <DateDropDown getUserbirth={setUserBirth} />
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

import { useState } from "react";
import "../../../css/components/users/signup/Step2.css";
import ProgressBar from "./ProgressBar";

export default function Step2({ nextStep }) {
  const [isEmailInput, setIsEmailInput] = useState(false);
  const [isEmailError, setIsEmailError] = useState(undefined);

  // 이메일이 입력되었는지 감지하는 함수
  function checkValidEmail(input) {
    // 초기화
    setIsEmailError(undefined);

    // 길이가 3이상
    if (input.length < 3) {
      resetInputAndSetError("이메일은 세 글자 이상이어야합니다.");
      // 특수문자 사용
    } else if (
      checkInvalidString("?", input) ||
      checkInvalidString("!", input) ||
      checkKorean(input)
    ) {
      resetInputAndSetError(
        "아이디는 영문 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)만 사용할 수 있습니다."
      );
    } else {
      setIsEmailInput(input);
    }
  }

  function checkInvalidString(string, email) {
    const now = email.split("").findIndex((el) => el === string);
    if (now === -1) {
      return false;
    } else {
      return true;
    }
  }

  function resetInputAndSetError(error) {
    setIsEmailInput(false);
    setIsEmailError(error);
  }

  function checkKorean(input) {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return korean.test(input);
  }

  return (
    <div className="step2-container">
      <div className="step2-inner-container">
        <ProgressBar width="40%" />
        <div className="step2-header">
          <div>
            카카오계정으로 사용할
            <br />
            카카오메일을 만들어 주세요.
          </div>
        </div>
        <div className="step2-body">
          <div className="step2-email-input">
            <div className="input-form">
              <input
                placeholder="아이디 입력"
                onChange={(e) => checkValidEmail(e.target.value)}
              ></input>
              <div>@kakao.com</div>
            </div>
            {isEmailError && <div className="email-error">{isEmailError}</div>}
          </div>
          <div className="step2-description">
            <li>입력한 카카오메일로 카카오계정에 로그인할 수 있습니다.</li>
            <li>
              한번 만든 카카오메일은 변경할 수 없으니, 오타가 없도록 신중히
              확인해 주세요.
            </li>
            <li>
              생성한 카카오메일로 카카오계정과 관련한 알림을 받아볼 수 있습니다.
            </li>
          </div>
        </div>
        <div className="step2-footer">
          <div
            style={
              isEmailInput
                ? { backgroundColor: "#fee501" }
                : { backgroundColor: "#f0f0f0" }
            }
            onClick={() => {
              isEmailInput && nextStep(3);
            }}
          >
            다음
          </div>
        </div>
      </div>
    </div>
  );
}

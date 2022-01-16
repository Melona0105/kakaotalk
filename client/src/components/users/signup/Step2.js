import { useEffect, useState } from "react";
import "../../../css/components/users/signup/Step2.css";
import { checkKorean, checkInvalidString } from "../../../functions";
import RemoveButton from "../../etc/RomoveButton";
import ProgressBar from "./ProgressBar";
import axios from "axios";

export default function Step2({ nextStep, setCurrentEmail }) {
  const [isEmailInput, setIsEmailInput] = useState(false);
  const [isEmailError, setIsEmailError] = useState(undefined);
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailFill, setIsEmailFill] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);

  // 이메일이 입력되었는지 감지하는 함수
  function checkValidEmail(input) {
    setInputEmail(input);
    // 초기화
    setIsEmailError(undefined);

    // 길이가 3이상
    if (input.length < 3) {
      resetInputAndSetError("이메일은 세 글자 이상이어야합니다.");
    } else if (
      // 특수문자 사용
      checkInvalidString("?", input) ||
      checkInvalidString("!", input) ||
      // 한국어 체크
      checkKorean(input)
    ) {
      resetInputAndSetError(
        "아이디는 영문 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)만 사용할 수 있습니다."
      );
    } else {
      setIsEmailInput(input);
    }
  }

  function resetInputAndSetError(error) {
    setIsEmailInput(false);
    setIsEmailError(error);
  }

  // 변할때마다 서버에 해당 이메일을 보내서 이메일을 확인한다.
  // async function checkExistedEmail() {
  //   if (isEmailInput) {
  //     try {
  //       const response = await axios({
  //         method: "POST",
  //         url: "http://localhost:4000/users",
  //         withCredentials: true,
  //         data: { email: inputEmail },
  //       });
  //       const { status } = response;
  //       if (status === 201) {
  //         console.log("사용가능");
  //       } else {
  //         console.log("이미 존재합니다.");
  //       }
  //       // 이 값이 이미 있는 값이라면, 에러를 띄운다.

  //       // 아니라면 그냥 사용가능하다고 띄워준다.
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }

  useEffect(() => {
    if (inputEmail.length) {
      setIsEmailFill(true);
    } else {
      setIsEmailFill(false);
    }
  }, [inputEmail]);

  return (
    <div className="step2-container">
      <div className="step2-inner-container">
        <ProgressBar width="50%" />
        <div className="step2-header">
          <div>
            카카오계정으로 사용할
            <br />
            카카오메일을 만들어 주세요.
          </div>
        </div>
        <div className="step2-body">
          <div className="step2-email-input">
            <div className="step2-input-form">
              <input
                placeholder="아이디 입력"
                value={inputEmail}
                onChange={(e) => {
                  checkValidEmail(e.target.value);
                  // checkExistedEmail();
                }}
              />
              {isEmailFill && (
                <RemoveButton
                  callback={() => {
                    setInputEmail("");
                    setIsEmailInput(false);
                  }}
                />
              )}
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
              setCurrentEmail(isEmailInput);
            }}
          >
            다음
          </div>
        </div>
      </div>
    </div>
  );
}

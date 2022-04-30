import { useEffect, useState } from "react";
import Service from "../../services";
import { checkInvalidString, checkKorean } from "../../utils";

function useStep2(nextStep, setCurrentEmail) {
  const [isEmailInput, setIsEmailInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailFill, setIsEmailFill] = useState(false);

  // 이메일이 입력되었는지 감지하는 함수
  function checkValidEmail(input) {
    setInputEmail(input);
    // 초기화
    setErrorMessage(undefined);

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
    } else if (
      inputEmail.split("").findIndex((el) => el === "@") === -1 ||
      inputEmail.split("").findIndex((el) => el === ".") === -1
    ) {
      resetInputAndSetError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setIsEmailInput(input);
    }
  }

  function resetInputAndSetError(error) {
    setIsEmailInput(false);
    setErrorMessage(error);
  }

  // TODO : 이메일이 다 입력되고 나면, 서버에 요청해서 확인해야한다.
  async function checkExistedEmail() {
    try {
      return await Service.users.checkEmail(inputEmail);
    } catch {
      return false;
    }
  }

  async function handleButtonNext() {
    const check = await checkExistedEmail();
    // 이메일이 유효하면
    if (check) {
      setCurrentEmail(inputEmail);
      nextStep(3);
    } else {
      // 유효하지 않으면 경고창 띄우기
      resetInputAndSetError(
        "이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요."
      );
    }
  }

  useEffect(() => {
    if (inputEmail.length) {
      setIsEmailFill(true);
    } else {
      setIsEmailFill(false);
    }
  }, [inputEmail]);

  return {
    models: { inputEmail, isEmailFill, errorMessage, isEmailInput },
    operations: {
      checkValidEmail,
      setInputEmail,
      setIsEmailInput,
      handleButtonNext,
    },
  };
}

export default useStep2;

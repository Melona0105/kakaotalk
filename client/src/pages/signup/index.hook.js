import { useEffect, useState } from "react";

function useSignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreements, setAgreements] = useState(undefined); // 약관 동의값
  const [currentEmail, setCurrentEmail] = useState(undefined); // 가입한 이메일(앞만)
  const [currentPassword, setCurrentPassword] = useState(undefined); // 가입한 비밀번호
  const [currentUserInfo, setCurrentUserInfo] = useState({
    agreements,
    email: currentEmail,
    password: currentPassword,
  });

  // 약관 순회하면서, 동의한 약관만 걸러서 넣어주도록하기
  function getAgreeIndex(agreements) {
    if (agreements) {
      const result = [];
      for (let i = 0; i < agreements.length; i++) {
        const now = agreements[i];
        now && result.push(i);
      }
      return result;
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    setCurrentUserInfo({
      agreements: getAgreeIndex(agreements),
      email: currentEmail,
      password: currentPassword,
    });
  }, [agreements, currentEmail, currentPassword]);

  return {
    models: { currentStep, currentEmail, currentUserInfo },
    operations: {
      setCurrentStep,
      setAgreements,
      setCurrentEmail,
      setCurrentPassword,
    },
  };
}

export default useSignUp;

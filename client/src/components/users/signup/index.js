import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export default function SingUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreements, setAgreements] = useState(undefined); // 약관 동의값
  const [currentEmail, setCurrentEmail] = useState(undefined); // 가입한 이메일(앞만)
  const [currentPassword, serCurrentPassword] = useState(undefined); // 가입한 비밀번호
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

  if (currentStep === 1) {
    return <Step1 nextStep={setCurrentStep} setAgreements={setAgreements} />;
  } else if (currentStep === 2) {
    return (
      <Step2 nextStep={setCurrentStep} setCurrentEmail={setCurrentEmail} />
    );
  } else if (currentStep === 3) {
    return (
      <Step3
        nextStep={setCurrentStep}
        currentEmail={currentEmail}
        serCurrentPassword={serCurrentPassword}
      />
    );
  } else if (currentStep === 4) {
    return <Step4 currentUserInfo={currentUserInfo} />;
  }
}

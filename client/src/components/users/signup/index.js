import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export default function SingUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentEmail, setCurrentEmail] = useState(undefined);
  const [currentPassword, serCurrentPassword] = useState(undefined);
  if (currentStep === 1) {
    return <Step1 nextStep={setCurrentStep} />;
  } else if (currentStep === 2) {
    return (
      <Step2 nextStep={setCurrentStep} setCurrentEmail={setCurrentEmail} />
    );
  } else if (currentStep === 3) {
    return <Step3 nextStep={setCurrentStep} currentEmail={currentEmail} />;
  } else if (currentStep === 4) {
    return (
      <Step4
        nextStep={setCurrentStep}
        serCurrentPassword={serCurrentPassword}
      />
    );
  }
}

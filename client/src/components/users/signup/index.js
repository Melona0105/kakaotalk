import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function SingUp() {
  const [currentStep, setCurrentStep] = useState(1);
  if (currentStep === 1) {
    return <Step1 nextStep={setCurrentStep} />;
  } else if (currentStep === 2) {
    return <Step2 nextStep={setCurrentStep} />;
  } else if (currentStep === 3) {
    return <div>3단계</div>;
  }
}

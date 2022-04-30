import useSignUp from "./index.hook";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

function SignUp() {
  const { models, operations } = useSignUp();
  const { currentStep, currentEmail, currentUserInfo } = models;
  const { setCurrentStep, setAgreements, setCurrentEmail, setCurrentPassword } =
    operations;
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
        serCurrentPassword={setCurrentPassword}
      />
    );
  } else if (currentStep === 4) {
    return <Step4 currentUserInfo={currentUserInfo} />;
  }
}

export default SignUp;

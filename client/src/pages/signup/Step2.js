import "./Step2.css";
import RemoveButton from "../../pages/common/components/RemoveButton";
import ProgressBar from "./ProgressBar";
import useStep2 from "./Step2.hook";

export default function Step2({ nextStep, setCurrentEmail }) {
  const { models, operations } = useStep2(nextStep, setCurrentEmail);
  const { inputEmail, isEmailFill, errorMessage, isEmailInput } = models;
  const { checkValidEmail, setInputEmail, setIsEmailInput, handleButtonNext } =
    operations;
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
            {errorMessage && <div className="email-error">{errorMessage}</div>}
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
              isEmailFill && isEmailInput && handleButtonNext();
            }}
          >
            다음
          </div>
        </div>
      </div>
    </div>
  );
}

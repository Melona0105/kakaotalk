import ProgressBar from "./ProgressBar";
import "./Step3.css";
import RemoveButton from "../../pages/common/components/RemoveButton";
import useStep3 from "./Step3.hook";

export default function Step3({ nextStep, currentEmail, serCurrentPassword }) {
  const { models, operations } = useStep3();
  const {
    inputPassword,
    isPasswordError,
    passwordConfirm,
    isConfirmPasswordFill,
    isPasswordConfirm,
    password,
    isPasswordFill,
  } = models;
  const {
    checkValidPassword,
    setInputPassword,
    setPassword,
    setIsPasswordError,
    setPasswordConfrim,
  } = operations;
  return (
    <div className="step3-container">
      <div className="step3-inner-container">
        <ProgressBar width="75%" />
        <div className="step3-header">
          <div>
            카카오계정 로그인에 사용할
            <br />
            비밀번호를 등록해 주세요.
          </div>
        </div>
        <div className="step3-body">
          <div className="step3-current-email-container">
            <div>카카오계정</div>
            <div className="step3-current-email">{currentEmail}</div>
          </div>
          <div className="step3-password-form">
            <div>비밀번호</div>
            <div className="step3-password-input-form">
              <div>
                <input
                  placeholder="비밀번호 입력(8~32자리)"
                  value={inputPassword}
                  type="password"
                  onChange={(e) => {
                    checkValidPassword(e.target.value);
                  }}
                />
                {isPasswordFill && (
                  <RemoveButton
                    callback={() => {
                      setInputPassword("");
                      setPassword("");
                      setIsPasswordError(false);
                    }}
                  />
                )}
              </div>
              {isPasswordError && (
                <div className="step3-password-error">
                  비밀번호는 8~32자리(영문자/숫자/특수문자)로 입력할 수 있어요.
                </div>
              )}
            </div>
            <div className="step3-password-input-form">
              <div>
                <input
                  placeholder="비밀번호 입력 재입력"
                  value={passwordConfirm}
                  type="password"
                  onChange={(e) => setPasswordConfrim(e.target.value)}
                />
                {isConfirmPasswordFill && (
                  <RemoveButton callback={() => setPasswordConfrim("")} />
                )}
              </div>
              {isConfirmPasswordFill && !isPasswordConfirm && (
                <div className="step3-confirm-password-error">
                  입력한 비밀번호와 재입력한 비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
          </div>
          <div className="step3-description">
            <div>
              <li>
                비밀번호는 8~32자리의 영문 대소문자, 숫자, 특수문자를 조합하여
                설정해 주세요.
              </li>
              <li>
                다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는
                사용하지 마세요.
              </li>
              <li>
                안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.
              </li>
            </div>
          </div>
        </div>
        <div
          className="step3-footer"
          style={
            isPasswordConfirm
              ? { backgroundColor: "#fee501" }
              : { backgroundColor: "#f0f0f0" }
          }
          onClick={() => {
            if (isPasswordConfirm) {
              nextStep(4);
              serCurrentPassword(password);
            }
          }}
        >
          <div>다음</div>
        </div>
      </div>
    </div>
  );
}

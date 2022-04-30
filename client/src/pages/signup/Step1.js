import "./Step1.css";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";
import CheckBox from "./CheckBox";
import useStep1 from "./Step1.hook";

export default function Step1({ nextStep, setAgreements }) {
  const { models, operations } = useStep1();
  const { agreeAll, checkList, agreeStatus, isEssentialAgreeOn } = models;
  const { selectAll, setIsAgreeStatus } = operations;
  return (
    <div className="step1-container">
      <div className="step1-inner-container">
        <div>
          <ProgressBar width="25%" />
          <Link className="go-back" to="/">
            처음으로
          </Link>
        </div>
        <div className="step1-header">
          <div>카카오계정</div>
          <div>서비스 약관에 동의해 주세요.</div>
        </div>
        <div className="step1-body">
          <div>
            <div className="step1-agreement-all-container">
              <input
                id="agree-all"
                className="agree-checkbox"
                type="checkbox"
                checked={agreeAll === -1 ? true : false}
                onChange={() => selectAll()}
              />
              <label htmlFor="agree-all"></label>
              <div className="step1-agreement-all">
                <label
                  className="step1-agreement-all-text agree-checkbox"
                  htmlFor="agree-all"
                >
                  모두 동의합니다.
                </label>
                <div>
                  전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
                  개별적으로도 동의를 선택하실 수 있습니다.
                  <br />
                  선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이
                  가능합니다.
                </div>
              </div>
            </div>
          </div>
          <div className="step1-agreement-detail-container">
            {checkList.map((el) => (
              <CheckBox
                key={el.id}
                id={el.id}
                title={el.title}
                text={el.text}
                isDetailOn={el.isDetailOn}
                agreeStatus={agreeStatus}
                setIsAgreeStatus={setIsAgreeStatus}
              />
            ))}
          </div>
        </div>
        <div className="step1-footer">
          <div
            style={
              isEssentialAgreeOn
                ? { backgroundColor: "#fada0b" }
                : { backgroundColor: "#fafafa" }
            }
            onClick={() => {
              if (isEssentialAgreeOn) {
                nextStep(2);
                setAgreements(agreeStatus);
              }
            }}
          >
            동의
          </div>
        </div>
      </div>
    </div>
  );
}

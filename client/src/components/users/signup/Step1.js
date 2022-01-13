import { useEffect, useState } from "react";
import "../../../css/components/users/signup/Step1.css";
import ProgressBar from "./ProgressBar";
import CheckBox from "./CheckBox";

export default function Step1({ nextStep }) {
  const [isEssentialAgreeOn, setIsEssentialArgeeOn] = useState(false);
  const [agreeStatus, setIsAgreeStatus] = useState(new Array(7).fill(false));
  const checkList = [
    { id: 0, title: "만 14세 이상입니다.", isDetailOn: false },
    { id: 1, title: "[필수] 카카오계정 약관", isDetailOn: true },
    {
      id: 2,
      title: "[필수] 카카오 통합서비스 약관",
      text: "본 약관은 회사가 제공하는 카카오, Daum 서비스 등에 공통 적용되며, 본 약관에 동의함으로써 해당 서비스들을 별도 이용계약 체결 없이 이용할 수 있습니다.",
      isDetailOn: true,
    },
    {
      id: 3,
      title: "[선택] 카카오알림 채널 추가 및 광고메시지 수신",
      isDetailOn: true,
    },
    { id: 4, title: "[필수] 개인정보 수집 및 이용 동의", isDetailOn: true },
    { id: 5, title: "[선택] 위치정보 수집 및 이용 동의", isDetailOn: true },
    { id: 6, title: "[선택] 프로필정보 추가 수집 동의", isDetailOn: true },
  ];

  //TODO : 입력한 데이터들 모아서 한꺼번에 보내줘야 함
  // 여기 젤 위에서 상태로 관리 -> 마지막에 그 데이터 전송

  const agreeAll = agreeStatus.findIndex((el) => el === false);
  function selectAll() {
    if (agreeAll === -1) {
      setIsAgreeStatus(new Array(7).fill(false));
    } else {
      setIsAgreeStatus(new Array(7).fill(true));
    }
  }

  useEffect(() => {
    agreeStatus[1] && agreeStatus[2] && agreeStatus[4]
      ? setIsEssentialArgeeOn(true)
      : setIsEssentialArgeeOn(false);
  }, [agreeStatus]);

  return (
    <div className="step1-container">
      <div className="step1-inner-container">
        <ProgressBar width="25%" />
        <div className="step1-header">
          <div>카카오계정</div>
          <div>서비스 약관에 동의해 주세요.</div>
        </div>
        <div className="step1-body">
          <div>
            <div className="step1-agreement-all-container">
              <input
                id="agree-all"
                type="checkbox"
                checked={agreeAll === -1 ? true : false}
                onChange={() => selectAll()}
              />
              <label htmlFor="agree-all"></label>
              <div className="step1-agreement-all">
                <label className="step1-agreement-all-text" htmlFor="agree-all">
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
              isEssentialAgreeOn && nextStep(2);
            }}
          >
            동의
          </div>
        </div>
      </div>
    </div>
  );
}

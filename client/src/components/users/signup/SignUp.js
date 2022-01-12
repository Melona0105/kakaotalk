import { useState } from "react";
import "../../../css/components/users/signup/Signup.css";
import process_1 from "../../../images/signup/1.png";
import CheckBox from "./CheckBox";

export default function SignUp() {
  const [isAgreeOn, setIsArgeeOn] = useState(false);
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

  // TODO : 필수들이 선택되면, 동의가 활성화되도록 하기

  return (
    <div className="signup-container">
      <div className="signup-inner-container">
        <div className="inner-checkbox">
          <img src={process_1} />
        </div>
        <div className="signup-header">
          <div>카카오계정</div>
          <div>서비스 약관에 동의해 주세요.</div>
        </div>
        <div className="signup-body">
          <div>
            <div className="signup-agreement-all-container">
              <input id="agree-all" type="checkbox" />
              <label htmlFor="agree-all" />
              <div className="signup-agreement-all">
                <div className="signup-agreement-all-text">
                  모두 동의합니다.
                </div>
                <div>
                  전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
                  개별적으로도 동의를 선택하실 수 있습니다.
                </div>
                <div>
                  선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이
                  가능합니다.
                </div>
              </div>
            </div>
          </div>
          <div className="signup-agreement-detail-container">
            {checkList.map((el) => (
              <CheckBox
                key={el.id}
                id={el.id}
                title={el.title}
                text={el.text}
                isDetailOn={el.isDetailOn}
              />
            ))}
          </div>
        </div>
        <div className="signup-footer">
          <div
            style={
              isAgreeOn
                ? { backgroundColor: "#fada0b" }
                : { backgroundColor: "#fafafa" }
            }
          >
            동의
          </div>
        </div>
      </div>
    </div>
  );
}

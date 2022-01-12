import "../../../css/components/users/signup/Signup.css";
import process_1 from "../../../images/signup/1.png";
import CheckBox from "./CheckBox";

export default function SignUp() {
  const checkList = [
    { title: "만 14세 이상입니다.", isDetailOn: false },
    { title: "[필수] 카카오계정 약관", isDetailOn: true },
    {
      title: "[필수] 카카오 통합서비스 약관",
      text: "본 약관은 회사가 제공하는 카카오, Daum 서비스 등에 공통 적용되며, 본 약관에 동의함으로써 해당 서비스들을 별도 이용계약 체결 없이 이용할 수 있습니다.",
      isDetailOn: true,
    },
    {
      title: "[선택] 카카오알림 채널 추가 및 광고메시지 수신",
      isDetailOn: true,
    },
    { title: "[필수] 개인정보 수집 및 이용 동의", isDetailOn: true },
    { title: "[선택] 위치정보 수집 및 이용 동의", isDetailOn: true },
    { title: "[선택] 프로필정보 추가 수집 동의", isDetailOn: true },
  ];

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
              <input type="checkbox" />
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
                key={el.title}
                title={el.title}
                text={el.text}
                isDetailOn={el.isDetailOn}
              />
            ))}
          </div>
        </div>
        <div className="signup-footer">
          <div>동의</div>
        </div>
      </div>
    </div>
  );
}

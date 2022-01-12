export default function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-header">
        <div>카카오계정</div>
        <div>서비스 약관에 동의해 주세요.</div>
      </div>
      <div className="signup-body">
        <div className="signup-agreement-all">
          <div>모두 동의합니다.</div>
          <div>
            전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
            개별적으로도 동의를 선택하실 수 있습니다.
          </div>
          <div>
            선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이
            가능합니다.
          </div>
        </div>
        <div className="signup-detail-agreement">
          <div>만 14세 이상입니다.</div>
          <div>[필수] 카카오계정 약관</div>
          <div>[필수] 카카오 통합서비스 약관</div>
          <div>
            본 약관은 회사가 제공하는 카카오, Daum 서비스 등에 공통 적용되며, 본
            약관에 동의함으로써 해당 서비스들을 별도 이용계약 체결 없이 이용할
            수 있습니다.
          </div>
          <div>[선택] 카카오알림 채널 추가 및 광고메시지 수신</div>
          <div>[필수] 개인정보 수집 및 이용 동의</div>
          <div>[선택] 위치정보 수집 및 이용 동의</div>
          <div>[선택] 프로필정보 추가 수집 동의</div>
        </div>
      </div>
      <div className="signup-footer">
        <div>동의</div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

function useStep1() {
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

  return {
    models: { agreeAll, checkList, agreeStatus, isEssentialAgreeOn },
    operations: { selectAll, setIsAgreeStatus },
  };
}
export default useStep1;

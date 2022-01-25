import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";

export default function ChattingPage({ roomData }) {
  // 현재 배열에 새 데이터값을 합친다. 어떻게?
  // 항상 포문돌리는건 나중에 한번씩 보면서 어떻게 포문말고 다른거로 할지 고민해보기
  return (
    <div className="chatting-page-container">
      <RommPageNav />
      <div className="chatting-page-content">
        {roomData.length ? (
          roomData.map((el) => <Room key={el.username} data={el} />)
        ) : (
          <div className="chatting-page-blank">
            <div>아직 대화가 없어요.</div>
            <div>새로운 대화를 시작해보세요.</div>
          </div>
        )}
      </div>
    </div>
  );
}

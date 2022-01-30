import "../css/pages/ChattingPage.css";
import RommPageNav from "../components/chatting room/RommPageNav";
import Room from "../components/chatting room/Room";

export default function ChattingPage({ roomData }) {
  const a = roomData.filter((el) => el.status === 0);

  return (
    <div className="chatting-page-container">
      <RommPageNav />
      <div className="chatting-page-content">
        {a.length ? (
          a.map((el) => <Room key={el.username} data={el} />)
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

/*
pdwtop0105@naver.com
*/

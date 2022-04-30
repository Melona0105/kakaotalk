import react from "react";
import "./FriendStatus.css";
import SearchBar from "../../../../../../pages/common/components/SearchBar";
import FriendStatusCard from "./FriendStatusCard";
import useFriendStatus from "./FriendStatus.hook";

function FriendStatus() {
  const { models, operations } = useFriendStatus();
  const { currentKeyword, friendData, currentStatus } = models;
  const {
    handleMenuStyle,
    setCurrentStatus,
    setCurrentKeyword,
    searchOnChange,
    searchOnKeyDown,
  } = operations;
  return (
    <div className="friend-status-container">
      <div className="friend-status-header">
        <div>친구 관리</div>
        <div className="friend-status-menu">
          <div
            style={handleMenuStyle(1)}
            onClick={() => {
              setCurrentStatus(1);
              setCurrentKeyword("");
            }}
          >
            숨김 친구
          </div>
          <div
            style={handleMenuStyle(2)}
            onClick={() => {
              setCurrentStatus(2);
              setCurrentKeyword("");
            }}
          >
            차단 친구
          </div>
        </div>
      </div>
      <div className="friend-status-body">
        <SearchBar
          keyWord={currentKeyword}
          searchOnChange={searchOnChange}
          searchOnKeyDown={searchOnKeyDown}
        />
        <div className="friend-status-content">
          {friendData.length !== 0 && (
            <div>{`친구 (${friendData.length})`}</div>
          )}
          {!friendData.length && (
            <div className="friend-status-noti">목록이 없습니다.</div>
          )}
          {friendData.map((el) => (
            <FriendStatusCard
              key={el.email}
              data={el}
              currentStatus={currentStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendStatus;

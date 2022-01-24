import react, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn } from "../../../../actions";
import axios from "axios";
import "../../../../css/components/settings/detailSetting/friend/FriendStatus.css";
import SearchBar from "../../../etc/SearchBar";
import { filterDataByKeyWord } from "../../../../utils";
import FriendStatusCard from "./FriendStatusCard";
import client from "../../../../Socket";
import Service from "../../../../services";

export default function FriendStatus() {
  const dispatch = useDispatch();
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [friendStatusData, setFriendStatusData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [isRendering, setIsRendering] = useState(false);
  const friendData = currentKeyword === "" ? friendStatusData : sortedData;

  function searchOnChange(e) {
    setCurrentKeyword(e.target.value);
  }

  function searchOnKeyDown(e) {
    if (e.key === "Escape") {
      setCurrentKeyword("");
    }
  }

  // 친구목록 불러봐서 뿌려준다.
  client.on("friends", (message) => {
    setIsRendering(!isRendering);
  });

  useEffect(async () => {
    dispatch(handleLoadingOn(true));
    try {
      await Service.users.fetchFriends(currentStatus, setFriendStatusData);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }, [currentStatus, isRendering]);

  useEffect(() => {
    let nextState = [...friendStatusData];
    nextState = nextState.filter((el) =>
      filterDataByKeyWord(el.username, currentKeyword)
    );
    setSortedData(nextState);
  }, [currentKeyword]);

  function handleMenuStyle(input) {
    return currentStatus === input
      ? {
          color: "#000",
          borderBottom: "1px solid #000",
          fontWeight: "600",
        }
      : {};
  }

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

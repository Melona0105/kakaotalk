import react, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleLoadingOn } from "../../actions";
import axios from "axios";
import "../../css/components/settings/FriendStatus.css";
import SearchBar from "../etc/SearchBar";
import { filterDataByKeyWord } from "../../functions";
import FriendStatusCard from "./FriendStatusCard";

export default function FriendStatus() {
  const dispatch = useDispatch();
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [friendStatusData, setFriendStatusData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [sortedData, setSortedData] = useState([]);
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

  useEffect(async () => {
    dispatch(handleLoadingOn(true));
    try {
      const friendData = await axios({
        method: "GET",
        url: "http://localhost:4000/users/friends",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res) => res.data);
      setFriendStatusData(
        friendData.filter((el) => el.status === currentStatus)
      );
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }, [currentStatus]);

  useEffect(() => {
    let nextState = [...friendStatusData];
    nextState = nextState.filter((el) =>
      filterDataByKeyWord(el.username, currentKeyword)
    );
    setSortedData(nextState);
  }, [currentKeyword]);

  return (
    <div className="friend-status-container">
      <div className="friend-status-header">
        <div>친구 관리</div>
        <div className="friend-status-menu">
          <div
            onClick={() => {
              setCurrentStatus(1);
              setCurrentKeyword("");
            }}
          >
            숨김 친구
          </div>
          <div
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
        <div>
          <div>친구</div>
          {friendData.map((el) => (
            <FriendStatusCard key={el.email} data={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

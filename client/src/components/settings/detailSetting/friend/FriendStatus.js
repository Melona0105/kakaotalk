import react, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn } from "../../../../actions";
import axios from "axios";
import "../../../../css/components/settings/detailSetting/friend/FriendStatus.css";
import SearchBar from "../../../etc/SearchBar";
import { filterDataByKeyWord } from "../../../../functions";
import FriendStatusCard from "./FriendStatusCard";
import { io } from "socket.io-client";

export default function FriendStatus() {
  const dispatch = useDispatch();
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [friendStatusData, setFriendStatusData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [isRendering, setIsRendering] = useState(false);
  const friendData = currentKeyword === "" ? friendStatusData : sortedData;
  const socketRef = useRef();

  function searchOnChange(e) {
    setCurrentKeyword(e.target.value);
  }

  function searchOnKeyDown(e) {
    if (e.key === "Escape") {
      setCurrentKeyword("");
    }
  }
  // 친구목록 불러봐서 뿌려준다.

  useEffect(() => {
    // 소켓이 존재하지 않으면, 소켓을 열어준다.
    const client = io("http://localhost:4000");
    client.on("connect", () => {
      // console.log("connected");
    });
    client.on("disconnect", () => {
      console.log("discoonected");
    });
    client.on("friends", (message) => {
      setIsRendering(!isRendering);
    });
    socketRef.current = client;
    return () => {
      client.removeAllListeners();
    };
  }, [isRendering]);

  useEffect(async () => {
    dispatch(handleLoadingOn(true));
    try {
      const friendData = await axios({
        method: "GET",
        url: "http://localhost:4000/users/friends",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((res) => res.data);
      console.log(friendData);
      setFriendStatusData(
        friendData.filter((el) => el.status === currentStatus)
      );
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

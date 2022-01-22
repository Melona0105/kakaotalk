import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "../../css/components/friend/AddFriend.css";
import reset from "../../images/signup/reset button.png";
import { handleLoadingOn, handleUserFriends } from "../../actions";
import FriendInfo from "./FriendInfo";
import { io } from "socket.io-client";

export default function AddFriend() {
  const dispatch = useDispatch();
  const [isInputFill, setIsInputFill] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isErrorOn, setIsErrorOn] = useState(false);
  const [friendInfo, setFriendInfo] = useState(undefined);
  const [isFriend, setIsFriend] = useState(false);
  const [isComplete, setIscomplete] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    // 소켓이 존재하지 않으면, 소켓을 열어준다.
    const client = io("http://localhost:4000");
    client.on("connect", () => {
      // console.log("connected");12
    });
    client.on("disconnect", () => {
      console.log("discoonected");
    });
    client.on("friends", (message) => {
      // 여기도 socket 연결을 해놓고, 새로 데이터가 올때마다 새로 렌더링한다.
      console.log(message);
      console.log(1);
    });
    socketRef.current = client;
    return () => {
      client.removeAllListeners();
    };
  }, [isComplete]);

  useEffect(() => {
    inputEmail ? setIsInputFill(true) : setIsInputFill(false);
  }, [inputEmail]);

  async function findFriendFromServer() {
    setIsErrorOn(false);
    setIscomplete(false);
    setIsFriend(false);
    dispatch(handleLoadingOn(true));
    try {
      const { status, data } = await axios({
        method: "POST",
        url: "http://localhost:4000/friends",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { email: inputEmail },
      })
        .then((res) => res)
        .catch((err) => {
          console.log(err);
        });
      if (status === 202) {
        setIsFriend(true);
      }

      setFriendInfo(data.friendInfo);
      setIsEmailExist(true);
    } catch {
      setIsEmailExist(false);
      setIsErrorOn(true);
    } finally {
      dispatch(handleLoadingOn(false));
    }

    // 엔터를 누르면 서버에서 친구인지 아닌지를 확인한다.
  }

  async function AddFriendToServer() {
    dispatch(handleLoadingOn(true));
    try {
      // 친구목록에 추가
      const { data } = await axios({
        method: "PUT",
        url: "http://localhost:4000/friends",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { friendInfo },
      }).then((res) => res);
      // 추가하고 완료되었다고 상태 변경
      setIscomplete(true);
      // 바뀌었으니, 친구데이터를 다시 새로 받아온다.
      socketRef.current.emit("friends", "데이터입니다.");
    } catch (err) {
      console.log(err);
      // 친구가 추가되면 창을 닫아주고, 서버로부터 데이터를 다시 받아온다.
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }
  return (
    <div className="add-friend-container">
      <div>
        <div className="add-friend-title">친구 추가</div>
        <div className="add-friend-input-container">
          <div className="add-friend-inputform">
            <input
              placeholder="친구 카카오톡 이메일"
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && findFriendFromServer();
              }}
            />
            {isInputFill && (
              <img
                src={reset}
                onClick={() => {
                  setInputEmail("");
                }}
              />
            )}
          </div>
          <div className="add-friend-text">
            카카오톡 이메일을 이용해 친구를 찾을 수 있습니다.
          </div>
          <div className="add-friend-info">
            {isErrorOn && <div>이메일에 해당하는 친구가 없어요</div>}
            {isFriend && isEmailExist && (
              <div className="isFreind-container">
                <FriendInfo friendInfo={friendInfo} />
                <div>이미 친구로 등록한 친구에요</div>
              </div>
            )}
            {!isFriend && isEmailExist && (
              <div className="isFreind-container">
                <FriendInfo friendInfo={friendInfo} />
              </div>
            )}
          </div>
        </div>
        <div className="add-friend-button">
          {isComplete ? (
            <div className="add-friend-button-off">친구가 추가되었습니다.</div>
          ) : (
            <div
              className={
                !isFriend && isEmailExist
                  ? "add-friend-button-on"
                  : "add-friend-button-off"
              }
              onClick={() => {
                if (!isFriend && isEmailExist) {
                  AddFriendToServer();
                }
              }}
            >
              친구 추가
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

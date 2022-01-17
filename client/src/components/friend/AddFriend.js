import axios from "axios";
import { useEffect, useState } from "react";
import "../../css/components/friend/AddFriend.css";
import user1 from "../../images/friend/user1.png";
import reset from "../../images/signup/reset button.png";

export default function AddFriend() {
  const [isInputFill, setIsInputFill] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isErrorOn, setIsErrorOn] = useState(false);
  const [friendInfo, setFriendInfo] = useState(undefined);
  const [isFriend, setIsFriend] = useState(false);
  useEffect(() => {
    inputEmail ? setIsInputFill(true) : setIsInputFill(false);
  }, [inputEmail]);

  async function findFriendFromServer() {
    setIsErrorOn(false);
    setIsFriend(false);
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
      console.log(data);

      setFriendInfo(data.friendInfo);
      setIsEmailExist(true);
    } catch {
      setIsEmailExist(false);
      setIsErrorOn(true);
    }

    // 엔터를 누르면 서버에서 친구인지 아닌지를 확인한다.
  }

  async function AddFriendToServer() {
    try {
      // 친구목록에 추가
      const { data } = await axios({
        method: "PUT",
        url: "http://localhost:4000/friends",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { friendInfo },
      })
        .then((res) => res)
        .catch((err) => {
          console.log(err);
        });

      console.log(data);
    } catch {
      // 친구가 추가되면 창을 닫아주고, 서버로부터 데이터를 다시 받아온다.
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
                {friendInfo.photo ? (
                  <img src={friendInfo.photo} />
                ) : (
                  <img src={user1} />
                )}
                <div>{friendInfo.username}</div>
                <div>이미 친구로 등록한 친구에요</div>
              </div>
            )}
            {!isFriend && isEmailExist && (
              <div className="isFreind-container">
                {friendInfo.photo ? (
                  <img src={friendInfo.photo} />
                ) : (
                  <img src={user1} />
                )}
                <div>{friendInfo.username}</div>
              </div>
            )}
          </div>
        </div>
        <div className="add-friend-button">
          <div
            className={
              !isFriend && isEmailExist
                ? "add-friend-button-on"
                : "add-friend-button-off"
            }
            onClick={() => {
              !isFriend && isEmailExist && AddFriendToServer();
            }}
          >
            친구 추가
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/components/friend/AddFriend.css";
import reset from "../../images/signup/reset button.png";
import { handleIsRendering } from "../../actions";
import FriendInfo from "./FriendInfo";

export default function AddFriend() {
  const { isRendering } = useSelector((state) => state.RenderingReducer);
  const dispatch = useDispatch();
  const [isInputFill, setIsInputFill] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isErrorOn, setIsErrorOn] = useState(false);
  const [friendInfo, setFriendInfo] = useState(undefined);
  const [isFriend, setIsFriend] = useState(false);
  const [isComplete, setIscomplete] = useState(false);
  useEffect(() => {
    inputEmail ? setIsInputFill(true) : setIsInputFill(false);
  }, [inputEmail]);

  async function findFriendFromServer() {
    setIsErrorOn(false);
    setIscomplete(false);
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
      setIscomplete(true);
    } catch {
      alert("알수없는 에러가 발생했어요");
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
                  // 왜 이거로 바꿔도 상태가 안 바뀌지?
                  dispatch(handleIsRendering(!isRendering));
                  AddFriendToServer();
                  Component.forceUpdate();
                }
                // 친구를 추가하는 시점에서 밖의 상태를 건드려서 렌더링을 시킨다 -> 하나 만들지 기존에 있는거 활용할 수 있을지 찾아보기
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

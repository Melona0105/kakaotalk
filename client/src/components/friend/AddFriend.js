import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../css/components/friend/AddFriend.css";
import reset from "../../images/signup/reset button.png";
import { handleLoadingOn } from "../../actions";
import client from "../../Socket";
import user1 from "../../images/friend/user1.png";
import { server } from "../../utils";
import Service from "../../services";

export default function AddFriend() {
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

  // 엔터를 누르면 서버에서 친구인지 아닌지를 확인한다.
  async function findFriendFromServer() {
    setIsErrorOn(false);
    setIscomplete(false);
    setIsFriend(false);
    dispatch(handleLoadingOn(true));
    try {
      await Service.friends.getFindedFriend(
        inputEmail,
        setIsFriend,
        setFriendInfo
      );
      setIsEmailExist(true);
    } catch {
      setIsEmailExist(false);
      setIsErrorOn(true);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  async function AddFriendToServer() {
    dispatch(handleLoadingOn(true));
    try {
      // 친구목록에 추가
      await Service.friends.updateFriendInfo(friendInfo, setIscomplete);
      client.emit("friends", "data");
    } catch (err) {
      console.log(err);
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
            <div className="isfriend-container">
              {isFriend && <div>이미 친구로 등록한 친구에요</div>}
              {isEmailExist && (
                <>
                  <img
                    src={
                      friendInfo.photo ? `${server}/${friendInfo.photo}` : user1
                    }
                  />
                  <div className="isfriend-username">{friendInfo.username}</div>
                </>
              )}
            </div>
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

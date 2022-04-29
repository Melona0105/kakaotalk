import "./AddFriend.css";
import reset from "../../../images/signup/reset button.png";
import user1 from "../../../images/friend/user1.png";
import { server } from "../../../utils";
import useAddFriend from "./AddFriend.hook";

function AddFriend() {
  const { models, operations } = useAddFriend();
  const {
    inputEmail,
    isInputFill,
    isErrorOn,
    isFriend,
    isEmailExist,
    friendInfo,
    isComplete,
  } = models;
  const { setInputEmail, findFriendFromServer, AddFriendToServer } = operations;
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

export default AddFriend;

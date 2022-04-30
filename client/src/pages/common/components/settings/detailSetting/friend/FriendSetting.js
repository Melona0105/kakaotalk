import react, { useState } from "react";
import "./FriendSetting.css";
import FriendStatus from "./FriendStatus";
import { useSelector, useDispatch } from "react-redux";
import { handleBirthdayFriend } from "../../../../../../actions";
import client from "../../../../../../Socket";

function FriendSetting() {
  const [isFriendsOn, setIsFriendsOn] = useState(false);
  const { isBirthDayFriendOn } = useSelector(
    (state) => state.BirthFriendReducer
  );
  const dispatch = useDispatch();
  return (
    <div className="friend-setting-container">
      <div className="friend-setting-item">
        <div className="friend-setting-item-title">친구 관리</div>
        <div className="friend-setting-item-text">
          숨김 / 차단된 친구 목록을 관리할 수 있습니다.
        </div>
        <div
          className="friend-setting-view-button"
          onClick={() => {
            setIsFriendsOn(!isFriendsOn);
          }}
        >
          목록 보기
        </div>
        {isFriendsOn && <FriendStatus />}
      </div>
      <div className="friend-setting-item">
        <div className="friend-setting-item-title">생일 친구</div>
        <div className="friend-setting-birth">
          <input
            id="birth-button"
            type="checkbox"
            className="friend-birth-button"
            checked={isBirthDayFriendOn}
            onChange={() => {
              dispatch(handleBirthdayFriend(!isBirthDayFriendOn));
              client.emit("birth", "data");
              console.log(1);
            }}
          />
          <label className="friend-birth-button" htmlFor="birth-button"></label>
          <div>생일인 친구 보기</div>
        </div>
        <div className="friend-setting-item-text">
          친구 목록에서 친구의 생일 정보를 보여줍니다.
        </div>
      </div>
    </div>
  );
}

export default FriendSetting;

import React from "react";
import myphoto from "../images/friend/my photo.png";
import search from "../images/friend/search.png";
import add from "../images/friend/add friend.png";
import "../css/pages/FriendPage.css";

export default function FriendPage() {
  // TODO : 누르면 컴포넌트가 생기도록 하면 될듯
  return (
    <div className="friend-page-container">
      <div className="firend-page-nav">
        <div className="firend-page-nav-left">친구</div>
        <div className="firend-page-nav-right">
          <img src={search} />
          <img src={add} />
        </div>
      </div>
      <div className="firend-page-content">
        <div className="my-profile">
          <div className="my-profile-img-container">
            <img src={myphoto} />
          </div>
          <div className="my-profile-detail">
            <div className="my-profile-username">박덕원</div>
            <div className="my-profile-song">행복해서 미안해 - 다비치</div>
          </div>
        </div>
        <div className="birthday-friend">생일인 친구</div>{" "}
        {/* 생일인 친구가 있을 경우 */}
        <div className="my-friends">친구목록</div>
      </div>
    </div>
  );
}

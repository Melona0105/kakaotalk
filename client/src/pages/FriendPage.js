import React, { useState } from "react";
import "../css/pages/FriendPage.css";
import FriendNav from "../components/friend/FriendNav";
import MyProfile from "../components/friend/MyProfile";
import BirthdayFriend from "../components/friend/BirthdayFriend";
import Friends from "../components/friend/Friends";

export default function FriendPage() {
  // TODO : 누르면 컴포넌트가 생기도록 하면 될듯
  const [isBirthdayOn, setIsBirthdayOn] = useState(true);
  return (
    <div className="friend-page-container">
      <FriendNav />
      <div className="friend-page-content">
        <MyProfile />
        {isBirthdayOn && <BirthdayFriend />}
        <Friends />
      </div>
    </div>
  );
}

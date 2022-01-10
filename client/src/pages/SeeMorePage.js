import SeeMoreNav from "../components/seemore/SeeMoreNav";
import seemore from "../images/seemore/seemore.png";
import subscription from "../images/seemore/subscription.png";
import "../css/pages/SeeMorePage.css";

export default function SeeMorePage({ userInfo }) {
  const { username, email } = userInfo;
  return (
    <div className="seemore-page-container">
      <SeeMoreNav />
      <div className="seemore-page-content">
        <div className="seemore-page-content-header">
          <div className="seemore-mycard">
            <div className="mycard-info">
              <div>
                <div className="mycard-username">{username}</div>
                <div className="mycard-email">{email}</div>
              </div>
              <img src={seemore} />
            </div>
            <div className="mycard-subscription">
              <div>My 구독</div>
              <img src={subscription} />
            </div>
          </div>
        </div>
        <div className="seemore-page-content-body"></div>
        <div className="seemore-page-content-footer"></div>
      </div>
    </div>
  );
}

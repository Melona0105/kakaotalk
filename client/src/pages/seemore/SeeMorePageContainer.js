import SeeMoreNav from "./components/SeeMoreNav";
import seemore from "../../images/seemore/seemore.png";
import subscription from "../../images/seemore/subscription.png";
import "./SeeMorePage.css";
import SeeMoreMenu from "./components/SeeMoreMenu";
import kakaoTalk from "../../images/seemore/kakao talk.svg";
import dev_info from "../../images/seemore/dev info.png";
import { useSelector } from "react-redux";

function SeeMorePageContainer() {
  const { username, email } = useSelector((state) => state.UserInfoReducer);
  const projects = [
    {
      name: "Kakao Talk",
      url: `https://github.com/Melona0105/kakaotalk`,
      logo: kakaoTalk,
    },
  ];
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
        <div className="seemore-page-content-body">
          {projects.map((el) => (
            <SeeMoreMenu key={el.name} data={el} />
          ))}
        </div>
        <div className="seemore-page-content-footer">
          <div className="kakao-talk-info">
            <div>
              <img src={dev_info} />
              <div>카카오톡 정보</div>
            </div>
            <div>ver 1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeMorePageContainer;

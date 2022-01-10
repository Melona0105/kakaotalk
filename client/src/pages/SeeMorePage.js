import SeeMoreNav from "../components/seemore/SeeMoreNav";
import '../css/pages/SeeMorePage.css'

export default function SeeMorePage() {
  return (
    <div className="seemore-page-container">
      <SeeMoreNav />
      <div className="seemore-page-content">
        <div className="seemore-page-content-header"></div>
        <div className="seemore-page-content-body"></div>
        <div className="seemore-page-content-footer"></div>
      </div>
    </div>
  );
}

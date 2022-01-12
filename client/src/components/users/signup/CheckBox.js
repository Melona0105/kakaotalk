import arrow from "../../../images/signup/arrow.png";
import "../../../css/components/users/signup/CheckBox.css";

export default function CheckBox({ title, text, isDetailOn }) {
  return (
    <div className="signup-agreement-container">
      <div className="signup-agreement-title">
        <input type="checkbox" />
        <div>
          <div>{title}</div>
          <div className="signup-agreement-text">{text}</div>
        </div>
      </div>
      {isDetailOn && <img src={arrow} />}
    </div>
  );
}

import arrow from "../../../images/signup/arrow.png";
import "../../../css/components/users/signup/CheckBox.css";

export default function CheckBox({ id, title, text, isDetailOn }) {
  return (
    <div className="signup-agreement-container">
      <div className="signup-agreement-title">
        <input className="agree-checkbox" id={`${id}`} type="checkbox" />
        <label htmlFor={`${id}`} />
        <div>
          <label htmlFor={`${id}`}>{title}</label>
          <div className="signup-agreement-text">{text}</div>
        </div>
      </div>
      {isDetailOn && <img src={arrow} />}
    </div>
  );
}

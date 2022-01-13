import { useEffect, useState } from "react";
import arrow from "../../../images/signup/arrow.png";
import "../../../css/components/users/signup/CheckBox.css";

export default function CheckBox({
  id,
  title,
  text,
  isDetailOn,
  agreeStatus,
  setIsAgreeStatus,
}) {
  const [isAgreeOn, setIsArgeeOn] = useState(false);
  useEffect(() => {
    agreeStatus[id] ? setIsArgeeOn(true) : setIsArgeeOn(false);
  }, [agreeStatus]);
  return (
    <div className="signup-agreement-container">
      <div className="signup-agreement-title">
        <input
          className="agree-checkbox"
          id={`${id}`}
          type="checkbox"
          checked={agreeStatus[id] && true}
          onChange={() => {
            const nextState = [...agreeStatus];
            setIsArgeeOn(!isAgreeOn);
            nextState[id] = !isAgreeOn;
            setIsAgreeStatus(nextState);
          }}
        />
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

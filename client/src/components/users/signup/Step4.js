import { useState } from "react";
import "../../../css/components/users/signup/Step4.css";
import RemoveButton from "../../etc/RomoveButton";
import DropDowns from "./DropDowns";
import ProgressBar from "./ProgressBar";

export default function Step4() {
  const [userBirth, setUserBirth] = useState(undefined);
  return (
    <div className="step4-container">
      <div className="step4-inner-container">
        <ProgressBar width="100%" />
        <div className="step4-header">
          <div>
            카카오계정 프로필을
            <br />
            설정해 주세요.
          </div>
        </div>
        <div className="step4-body">
          <div className="step4-username">
            <div>닉네임</div>
            <div>
              <div className="step4-username-input">
                <input placeholder="닉네임 입력" />
                <RemoveButton />
                <div>8/20</div>
              </div>
              <div className="step4-username-error">
                닉네임을 입력해 주세요.
              </div>
            </div>
          </div>
          <div className="step4-birth">
            <div>생일</div>
            <div className="step4-birth-dropdowns">
              <DropDowns getUserbirth={setUserBirth} />
              <div>
                <div></div>
                <div>음력</div>
              </div>
            </div>
          </div>
          <div className="step4-gender">
            <div>성별</div>
            <div>
              <input type="checkbox" value="남성" />
              <input type="checkbox" value="남성" />
              <input type="checkbox" value="선택안함" />
            </div>
          </div>
        </div>
        <div className="step4-footer">
          <div>다음</div>
        </div>
      </div>
    </div>
  );
}

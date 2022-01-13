import "../../../css/components/users/signup/ProgressBar.css";

export default function ProgressBar({ width }) {
  return (
    <div className="signup-progress-bar">
      <div className="signup-progress-bar__bar" style={{ width }}></div>
    </div>
  );
}

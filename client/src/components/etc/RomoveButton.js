import reset_button from "../../images/signup/reset button.png";

export default function RemoveButton({ callback }) {
  return <img src={reset_button} onClick={callback} />;
}

import reset_button from "../../../images/signup/reset button.png";

function RemoveButton({ callback }) {
  return <img src={reset_button} onClick={callback} />;
}

export default RemoveButton;

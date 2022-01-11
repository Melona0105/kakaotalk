import React from "react";
import ReactDOM from "react-dom";

export default class Popup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.innerHTML =
      '<link rel="stylesheet" href="components/chatting/Chatting.css" type="text/css" />';
    this.newWindow = null;
  }

  componentDidMount() {
    this.newWindow = window.open(
      "",
      this.props.username,
      "top=100, left=100, width=375, height=640"
    );
    this.newWindow.document.body.appendChild(this.el);
    this.newWindow.document.title = this.props.username;
    this.newWindow.onkeydown = (e) => {
      if (e.key === "Escape") {
        this.props.setIsChattingOn(false);
        this.newWindow.close();
      }
    };
  }

  componentWillUnmount() {
    this.newWindow.document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
